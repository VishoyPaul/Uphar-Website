const express = require('express');
const {
  signup,
  login,
  googleLogin,
  refreshToken,
  logout,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

module.exports = router;
