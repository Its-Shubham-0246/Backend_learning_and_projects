function errorHandler(err,req,res,next) {
  console.log(err);
  const statuscode = err.statuscode || 500
  res.status(statuscode).json({
    success:false,
    message:statuscode===500?"Internal Server Error":err.message
  })
} 