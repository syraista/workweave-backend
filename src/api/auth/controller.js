const { body, param, validationResult } = require('express-validator');
const { 
  registerUser, 
  loginUser, 
  logoutUser,
  checkSessionUser
} = require('./service');

const registerHandler = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['client', 'worker']).withMessage('Role must be either client or worker'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const newUser = await registerUser(req.body);
      res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
      console.error('Error while registering user', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const loginHandler = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isString().notEmpty().withMessage('Password is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const user = await loginUser(req.body);
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      console.error('Error while logging in user', error.message);
      next({ status: "error", message: error.message });
    }
  }
];

const logoutHandler = [
  body('sessionId').isUUID().withMessage('Session ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const { sessionId } = req.body;
      const logoutData = await logoutUser(sessionId);
      res.status(200).json({ status: "success", data: logoutData });
    } catch (error) {
      console.error('Error while logging out user', error.message);
      next({ status: "error", message: error.message });
    }
  }
];

const checkSessionHandler = [
  param('sessionId').isUUID().withMessage('Session ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const session = await checkSessionUser(req.params.sessionId);
      res.status(200).json({ status: "success", data: session });
    } catch (error) {
      console.error('Error while checking session', error.message);
      next({ status: "error", message: error.message });
    }
  }
];

module.exports = {
  registerHandler,
  loginHandler,
  logoutHandler,
  checkSessionHandler
};
