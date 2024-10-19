const express = require("express");
const App = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./Middleware/error");
const dotenv = require("dotenv");

dotenv.config({ path: "Backend/config/config.env" });
App.use(express.json({ limit: "20mb" }));
App.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
App.use(cookieParser());
App.use(
  fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 },
  })
);
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
App.use("/api/v1", products);
App.use("/api/v1", user);
App.use("/api/v1", order);
App.use("/api/v1", payment);
App.use(errorMiddleware);

module.exports = App;

/*

Deleting review me problem aare!
problem in resest password
*/
