const App = require("./App");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const ConnectDatabase = require("./config/database");
dotenv.config({ path: "Backend/config/config.env" });

Port = process.env.PORT || 4000;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting Down the server due to Uncaught Exception ");
  process.exit(1);
});
// Connecting to database
ConnectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = App.listen(Port, () => {
  console.log(`Server is Working on PORT : ${Port}`);
});

// Unhandle promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting Down the server due to Unhandle Promise Rejection ");
  server.close(() => {
    process.exit(1);
  });
});
