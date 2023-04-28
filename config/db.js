const mongoose = require('mongoose');

// Replace the URI with your MongoDB Atlas cluster's connection string
const uri = 'mongodb+srv://root:cdzleap@cluster0.xixnf.mongodb.net/?retryWrites=true&w=majority';

const db = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = db;
