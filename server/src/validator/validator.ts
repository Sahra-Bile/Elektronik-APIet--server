import { body, param, query, check } from 'express-validator'

class UserValidator {
  checkCreateUser() {
    return [
      body('id')
        .optional()
        .isUUID(4)
        .withMessage('The value should be UUID v4'),
      body('firstName')
        .notEmpty()
        .withMessage('The  first name value should not be empty'),
      body('lastName')
        .notEmpty()
        .withMessage('The last name value should not be empty'),
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('The email value should not be empty'),
      body('password')
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters'),

      body('confirmPassword')
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters'),
    ]
  }
  checkLogin() {
    return [
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('The email value should not be empty and a valid email'),
      body('password')
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage(
          'Password must be between 4 to 16 characters and a valid password',
        ),
    ]
  }

  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value should be not empty')
        .isUUID(4)
        .withMessage('The value should be uuid v4'),
    ]
  }
}

export default new UserValidator()
