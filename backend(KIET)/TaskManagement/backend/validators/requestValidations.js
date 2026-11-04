const body = require('express-validator')
const registerValidator = [
  body('email').isString().trim().isEmpty().
  withMessage("email field cannot be empty").
  isEmail().withMessage("Provide Valid Email"),
  body('password').isString().withMessage("password require to be string").isLength(min:6).withMessage("Minimum 6 characters ").isEmpty().withMessage("Cant be empty")
]

const loginValidate =  [

]

