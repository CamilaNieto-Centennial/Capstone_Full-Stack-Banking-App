const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

/**
 * Connect to the MongoDB database using Mongoose.
 */
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI, {
    // Add your Mongoose configuration options here:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGODB_DB,
  }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
 });
}

module.exports = connectToDatabase;

