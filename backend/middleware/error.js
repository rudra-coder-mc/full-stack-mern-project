const ErrorHander = require("../utility/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // Wrong Mongodb ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHander(message, 400);
  }

  //Mongoose duplicate key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(message,400)
  }

   //Wrong JWT error
   if(err.code === "JsonWebTokenError"){
    const message = `Json web token is invalid, try again`;
    err = new ErrorHander(message,400)
  }
   //Wrong JWT expire
   if(err.code === "JsonWebTokenError"){
    const message = `Json web token is Expired`;
    err = new ErrorHander(message,400)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // message: err.stack,
  });
};
