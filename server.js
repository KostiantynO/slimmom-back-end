const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 4000 } = process.env;

const app = require('./app');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_HOST);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exitCode = 1;
  }
};

// Connect to the database before listening

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} for requests`);
  });
})();
