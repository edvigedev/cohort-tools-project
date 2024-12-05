function errorHandler(err, req, res, next) {


  const errorMessage = err.errorResponse?.errmsg || err.message || err._message;

  if (err.name === "MongoServerError") {
    return res.status(400).json({
      code: err.code,
      message: errorMessage,
      error: err.errorResponse || err,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      code: "ValidatonError",
      message: errorMessage,
      error: err.errors,
    });
  }

  res.status(500).json({
    code: "UnknownError",
    message: "Something went wrong due to " + errorMessage,
    error: err,
  });

  // if (err.statusCode) {
  //   res.status(err.statusCode).json({ error: err.message }); // Send a custom response
  // } else {
  //   res.status(500).json({ error: "Internal server error" }); // Unexpected error
  // }
}



module.exports = { errorHandler };
