const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: function() {
      return !this.googleId;
    },
    unique: true,
    sparse: true,
    default: undefined
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    default: undefined
  },
  profilePicture: {
    type: String,
    default: ''
  }
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
