const User = require('../modules/user/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject();
  delete user.password;
  return user;
};

const handleAuthError = (res, error, fallbackMessage) => {
  console.error('Auth error:', error);

  if (error?.code === 11000) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (error?.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error?.name === 'MongoServerSelectionError') {
    return res.status(503).json({ message: 'Database unavailable' });
  }

  return res.status(500).json({
    message: fallbackMessage,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

const resolveGoogleAuthPayload = (body = {}) => {
  let googleId = body.googleId || body.sub;
  let email = body.email;
  let firstName = body.firstName;
  let lastName = body.lastName;
  let profilePicture = body.profilePicture;

  // Fallback for clients that send only Google credential token
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

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedMobile = String(mobile || '').trim();

    if (!firstName || !lastName || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const userExists = await User.findOne({
      $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }]
    });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      mobile: normalizedMobile,
      password
    });
    const token = generateToken(user._id);

    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return handleAuthError(res, error, 'Signup failed');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return handleAuthError(res, error, 'Login failed');
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { googleId, email, firstName, lastName, profilePicture } = resolveGoogleAuthPayload(req.body);
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !googleId) {
      return res.status(400).json({ message: 'googleId and email are required' });
    }

    const safeFirstName =
      String(firstName || '').trim() || normalizedEmail.split('@')[0] || 'Google';
    const safeLastName = String(lastName || '').trim() || 'User';
    const safeProfilePicture = String(profilePicture || '').trim();

    const [emailUser, googleUser] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      User.findOne({ googleId })
    ]);

    let user = emailUser || googleUser;

    if (user) {
      // Update existing user safely without triggering unique key conflicts.
      user.firstName = user.firstName || safeFirstName;
      user.lastName = user.lastName || safeLastName;
      if (safeProfilePicture) user.profilePicture = safeProfilePicture;

      if (!user.googleId) {
        const googleIdOwner =
          googleUser && String(googleUser._id) !== String(user._id) ? googleUser : null;
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
        profilePicture: safeProfilePicture
      });
    }

    const token = generateToken(user._id);
    return res.status(200).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    if (error?.code === 11000) {
      const { googleId, email } = resolveGoogleAuthPayload(req.body);
      const normalizedEmail = String(email || '').trim().toLowerCase();

      const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { googleId }]
      });

      if (existingUser) {
        const token = generateToken(existingUser._id);
        return res.status(200).json({ token, user: sanitizeUser(existingUser) });
      }

      return res.status(409).json({ message: 'Google account conflict. Please try again.' });
    }
    return handleAuthError(res, error, 'Google login failed');
  }
};
