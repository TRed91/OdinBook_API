const { body } = require('express-validator');

const validationCreate = [
    body('username').trim()
        .isLength({ min: 1 })
        .withMessage('Username is required'),
    body('email').trim()
        .isEmail()
        .withMessage('Valid Email address is required'),
    body('password').trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    body('cpw').trim()
        .custom((cpw, {req}) => cpw === req.body.password)
        .withMessage('Passwords must match'),
]

const validationUpdate = [
    body('username').trim()
        .isLength({ min: 1 })
        .withMessage('Username is required'),
    body('email').trim()
        .isEmail()
        .withMessage('Valid Email address is required')
]

module.exports = {
    validationCreate,
    validationUpdate,
}