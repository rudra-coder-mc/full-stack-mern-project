const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "upload",
  })
);
app.use(
  cors({ origin: "http://localhost:5173", credentials: true }) // Replace with allowed origin
);

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const service = require("./routes/serviceRoute");
const booking = require("./routes/bookingRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", service);
app.use("/api/v1", booking);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {s
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
