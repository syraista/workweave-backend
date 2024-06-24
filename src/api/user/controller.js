const { body, param, validationResult } = require('express-validator');
const {
  getUserData,
  getUserDataByWorkerId,
  updateUser,
  getWorkerDataByProjectId,
  getApplicationByWorkerId
} = require('./service');

const getUserDataHandler = [
  param('userId').isUUID().withMessage('User ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const userData = await getUserData(req.params.userId);
      if (!userData) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
      res.status(200).json({ status: "success", data: userData });
    } catch (error) {
      console.error('Error while getting user data', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getUserDataByWorkerIdHandler = [
  // Validate worker ID
  param('workerId').isUUID().withMessage('Worker ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const userData = await getUserDataByWorkerId(req.params.workerId);
      if (!userData) {
        return res.status(404).json({ status: "error", message: "Worker not found" });
      }
      res.status(200).json({ status: "success", data: userData });
    } catch (error) {
      console.error('Error while getting user data by worker ID', error.message);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }
];

const updateUserHandler = [
  body('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('username').optional().isString().notEmpty().withMessage('Username must be a non-empty string'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('password').optional().isString().notEmpty().withMessage('Password must be a non-empty string'),
  body('role').optional().isIn(['client', 'worker']).withMessage('Role must be either client or worker'),
  body('jenis_kelamin').optional().isIn(['Pria', 'Wanita']).withMessage('Jenis kelamin must be either Pria or Wanita'),
  body('birth_date').optional().isISO8601().toDate().withMessage('Valid birth date is required'),
  body('profile_picture').optional().isURL().withMessage('Profile picture must be a valid URL'),
  body('phone_number').optional().isString().withMessage('Phone number must be a string'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('address').optional().isString().withMessage('Address must be a string'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    const userId = req.params.id;

    try {
      const updatedUser = await updateUser(req.params.userId, req.body);
      res.status(200).json({ status: "success", data: updatedUser });
    } catch (error) {
      console.error('Error while updating user', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getWorkerDataByProjectIdHandler = [
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const applications = await getWorkerDataByProjectId(req.params.projectId);
      if (applications) {
        res.status(200).json({ status: "success", data: { applications } });
      } else {
        res.status(404).json({ status: "error", message: "Worker Data not found" });
      }
    } catch (error) {
      console.error('Error while getting Worker Data', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getApplicationByWorkerIdHandler = [
  param('workerId').isUUID().withMessage('Worker ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const application = await getApplicationByWorkerId(req.params.workerId);
      if (application) {
        res.status(200).json({ status: "success", data: { application } });
      } else {
        res.status(404).json({ status: "error", message: "Worker not found" });
      }
    } catch (error) {
      console.error('Error while getting application by Worker ID', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

module.exports = {
  getUserDataHandler,
  getUserDataByWorkerIdHandler,
  updateUserHandler,
  getWorkerDataByProjectIdHandler,
  getApplicationByWorkerIdHandler
};
