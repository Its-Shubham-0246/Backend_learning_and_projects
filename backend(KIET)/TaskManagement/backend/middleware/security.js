const { validationResult: getValidationResult } = require('express-validator')

function validationResult(req, res, next) {
  const errors = getValidationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  return next()
}

module.exports = validationResult