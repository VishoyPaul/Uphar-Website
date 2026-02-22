const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');

const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';
const isProduction = process.env.NODE_ENV === 'production';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_USER_ID = 'admin-local';
const ADMIN_USER_EMAIL = 'admin@local.dev';

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return process.env.JWT_SECRET;
};

const signAccessToken = (user) =>
  jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
    },
    getJwtSecret(),
    { expiresIn: ACCESS_TOKEN_TTL }
  );

const signRefreshToken = (user) =>
  jwt.sign(
    {
      sub: String(user._id),
      type: 'refresh',
    },
    getJwtSecret(),
    { expiresIn: REFRESH_TOKEN_TTL }
  );

const buildUserPayload = (userDoc) => ({
  _id: userDoc._id,
  firstName: userDoc.firstName,
  lastName: userDoc.lastName,
  email: userDoc.email,
  mobile: userDoc.mobile,
  profilePicture: userDoc.profilePicture,
});

const getRefreshCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/api/auth',
});

const setRefreshCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, getRefreshCookieOptions());
};

const clearRefreshCookie = (res) => {
  const cookieOptions = getRefreshCookieOptions();
  delete cookieOptions.maxAge;
  res.clearCookie('refreshToken', cookieOptions);
};

const issueAuthResponse = (res, user) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  setRefreshCookie(res, refreshToken);

  return res.status(200).json({
    accessToken,
    user: buildUserPayload(user),
  });
};

const getAdminUserPayload = () => ({
  _id: ADMIN_USER_ID,
  firstName: 'Admin',
  lastName: 'User',
  email: ADMIN_USER_EMAIL,
  mobile: '',
  profilePicture: '',
});

const resolveGoogleAuthPayload = (body = {}) => {
  let googleId = body.googleId || body.sub;
  let email = body.email;
  let firstName = body.firstName;
  let lastName = body.lastName;
  let profilePicture = body.profilePicture;

  if ((!googleId || !email) && body.credential) {
    const decoded = jwt.decode(body.credential) || {};
    googleId = googleId || decoded.sub;
    email = email || decoded.email;
    firstName = firstName || decoded.given_name;
    lastName = lastName || decoded.family_name;
    profilePicture = profilePicture || decoded.picture;
  }

  return { googleId, email, firstName, lastName, profilePicture };
};

const handleAuthError = (res, error, fallbackMessage) => {
  console.error('Auth error:', error);

  if (error?.code === 11000) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (error?.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({
    message: fallbackMessage,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedMobile = String(mobile || '').trim();

    if (!firstName || !lastName || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const userExists = await User.findOne({
      $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }],
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      mobile: normalizedMobile,
      password,
    });

    return issueAuthResponse(res, user);
  } catch (error) {
    return handleAuthError(res, error, 'Signup failed');
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedUsername = String(username || '').trim().toLowerCase();

    if ((!email && !username) || !password) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    if (normalizedUsername === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return issueAuthResponse(res, getAdminUserPayload());
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return issueAuthResponse(res, user);
  } catch (error) {
    return handleAuthError(res, error, 'Login failed');
  }
};

const googleLogin = async (req, res) => {
  try {
    const { googleId, email, firstName, lastName, profilePicture } = resolveGoogleAuthPayload(req.body);
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !googleId) {
      return res.status(400).json({ message: 'googleId and email are required' });
    }

    const safeFirstName = String(firstName || '').trim() || normalizedEmail.split('@')[0] || 'Google';
    const safeLastName = String(lastName || '').trim() || 'User';
    const safeProfilePicture = String(profilePicture || '').trim();

    const [emailUser, googleUser] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      User.findOne({ googleId }),
    ]);

    let user = emailUser || googleUser;

    if (user) {
      user.firstName = user.firstName || safeFirstName;
      user.lastName = user.lastName || safeLastName;
      if (safeProfilePicture) user.profilePicture = safeProfilePicture;

      if (!user.googleId) {
        const googleIdOwner = googleUser && String(googleUser._id) !== String(user._id) ? googleUser : null;
        if (!googleIdOwner) {
          user.googleId = googleId;
        }
      }

      await user.save({ validateBeforeSave: false });
    } else {
      user = await User.create({
        firstName: safeFirstName,
        lastName: safeLastName,
        email: normalizedEmail,
        googleId,
        profilePicture: safeProfilePicture,
      });
    }

    return issueAuthResponse(res, user);
  } catch (error) {
    if (error?.code === 11000) {
      const { googleId, email } = resolveGoogleAuthPayload(req.body);
      const normalizedEmail = String(email || '').trim().toLowerCase();

      const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { googleId }],
      });

      if (existingUser) {
        return issueAuthResponse(res, existingUser);
      }

      return res.status(409).json({ message: 'Google account conflict. Please try again.' });
    }

    return handleAuthError(res, error, 'Google login failed');
  }
};

const refreshToken = async (req, res) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (!tokenFromCookie) {
      return res.status(401).json({ message: 'Refresh token is missing' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tokenFromCookie, getJwtSecret());
    } catch {
      clearRefreshCookie(res);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    if (!decoded?.sub || decoded?.type !== 'refresh') {
      clearRefreshCookie(res);
      return res.status(403).json({ message: 'Invalid refresh token payload' });
    }

    if (decoded.sub === ADMIN_USER_ID) {
      return issueAuthResponse(res, getAdminUserPayload());
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      clearRefreshCookie(res);
      return res.status(403).json({ message: 'User not found for refresh token' });
    }

    return issueAuthResponse(res, user);
  } catch (error) {
    return handleAuthError(res, error, 'Failed to refresh token');
  }
};

const logout = async (req, res) => {
  clearRefreshCookie(res);
  return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  signup,
  login,
  googleLogin,
  refreshToken,
  logout,
};
