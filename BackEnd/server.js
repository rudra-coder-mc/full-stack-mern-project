const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down server due to Uncaught Exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "BackEnd/config/config.env" });

//Connecting Database
connectDatabase();

cloudinary.config({
  cloud_name: 'dlc1in1ax', 
  api_key: '915151645357372', 
  api_secret: 'X_6Jckw5QVCWHwfVJgt8yvrgDcI' 
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
