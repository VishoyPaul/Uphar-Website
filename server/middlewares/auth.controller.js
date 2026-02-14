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
    const { googleId, email, firstName, lastName, profilePicture } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!googleId || !email) {
      return res.status(400).json({ message: 'googleId and email are required' });
    }

    let user = await User.findOne({ $or: [{ googleId }, { email: normalizedEmail }] });

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email: normalizedEmail,
        googleId,
        profilePicture
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return handleAuthError(res, error, 'Google login failed');
  }
};
