const mongoose = require("mongoose");

const ConnectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {}).then((data) => {
    console.log(`MongoDB Conneted with server : ${data.connection.host}`);
  });
};

module.exports = ConnectDatabase;
