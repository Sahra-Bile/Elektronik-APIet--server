import { body, param, query, check } from 'express-validator'
export const checkCreateComputer = () => {
  return [
    body('id').optional(),
    body('name').notEmpty().withMessage('the name value should not be empty'),
    body('description')
      .notEmpty()
      .withMessage('the description value should not be empty'),
    body('maker').notEmpty().withMessage('the maker value should not be empty'),
    body('processor')
      .notEmpty()
      .withMessage('the processor value should not be empty'),
    body('price')
      .notEmpty()
      .isNumeric()
      .withMessage(
        'the price value should not be empty and should be a number',
      ),
    body('imageUrl')
      .notEmpty()
      .withMessage('the imageUrl value should not be empty'),
  ]
}

export const checkIdParam = () => {
  return [
    param('id')
      .notEmpty()
      .withMessage('The value should be not empty')
      .isInt()

      .withMessage('The value should be number '),
  ]
}
