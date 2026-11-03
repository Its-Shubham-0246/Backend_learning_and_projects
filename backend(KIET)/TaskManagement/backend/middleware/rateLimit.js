const WINDOW_MS = 15 * 60 * 1000
const REQUEST_LIMIT = 5
const requestsByIp = new Map()

const cleanupInterval = setInterval(() => {
  const now = Date.now()

  for (const [ip, requestWindow] of requestsByIp) {
    if (now >= requestWindow.resetAt) {
      requestsByIp.delete(ip)
    }
  }
}, WINDOW_MS)
cleanupInterval.unref()

function rateLimit(req, res, next) {
  const ip = req.ip
  const now = Date.now()
  let requestWindow = requestsByIp.get(ip)

  if (!requestWindow || now >= requestWindow.resetAt) {
    requestWindow = {
      count: 0,
      resetAt: now + WINDOW_MS,
    }
    requestsByIp.set(ip, requestWindow)
  }  
  requestWindow.count += 1
  const remaining = Math.max(REQUEST_LIMIT - requestWindow.count, 0)
  const resetInSeconds = Math.ceil((requestWindow.resetAt - now) / 1000)

  res.setHeader('RateLimit-Limit', REQUEST_LIMIT)
  res.setHeader('RateLimit-Remaining', remaining)
  res.setHeader('RateLimit-Reset', resetInSeconds)

  if (requestWindow.count > REQUEST_LIMIT) {
    res.setHeader('Retry-After', resetInSeconds)
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    })
  }

  return next()
}

module.exports = rateLimit
