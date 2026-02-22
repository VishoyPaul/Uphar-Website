require('dotenv').config();
const mongose = require('mongoose');

const connectDb = async () => {
  try {
    await mongose.connect(process.env.MONGO_URI);
    console.log('Database Connected...');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
