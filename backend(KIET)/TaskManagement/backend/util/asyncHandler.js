const asyncHandler = (fn) => {
  return (req,res,next) => {
    Promise.resolve(fn(req,res,next))
    .catcher(next);
  }
}

module.exports = asyncHandler;