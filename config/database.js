const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`database connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`database connection failed : ${error.message}`);
    throw error;
  }
};

module.exports = dbConnection;
