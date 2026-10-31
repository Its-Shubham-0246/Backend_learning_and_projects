function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  console.error(err)

  const requestedStatus = err?.statusCode ?? err?.status ?? err?.statuscode
  const statusCode = Number.isInteger(requestedStatus) && requestedStatus >= 400 && requestedStatus <= 599
    ? requestedStatus
    : 500
  const message = statusCode >= 500
    ? 'Internal Server Error'
    : typeof err?.message === 'string' && err.message.trim()
      ? err.message
      : 'Request failed'

  return res.status(statusCode).json({
    success: false,
    message,
  })
}

module.exports = errorHandler