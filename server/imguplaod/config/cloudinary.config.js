const cloudinary = require('cloudinary').v2;
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const requiredEnv = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

for (const envKey of requiredEnv) {
  if (!process.env[envKey]) {
    throw new Error(`${envKey} is missing in server/.env`);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
