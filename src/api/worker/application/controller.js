const { param, body, validationResult } = require('express-validator');

const {
  getApplicationsByProjectId,
  getApplicationByApplicationId,
  applyProject
} = require('./service');

// Get applications by project ID handler
const getApplicationsByProjectIdHandler = [
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const applications = await getApplicationsByProjectId(req.params.projectId);
      res.status(200).json({ status: "success", data: { applications } });
    } catch (error) {
      console.error('Error while getting applications by project ID', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

// Get application by application ID handler
const getApplicationByApplicationIdHandler = [
  param('applicationId').isUUID().withMessage('Application ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const application = await getApplicationByApplicationId(req.params.applicationId);
      if (application) {
        res.status(200).json({ status: "success", data: { application } });
      } else {
        res.status(404).json({ status: "error", message: "Application not found" });
      }
    } catch (error) {
      console.error('Error while getting application by application ID', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];



const applyProjectHandler = [
  // Input validation
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),
  body('worker_id').isUUID().withMessage('Worker ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const newApplication = await applyProject(req.params.projectId, req.body);
      res.status(201).json({ status: "success", data: newApplication });
    } catch (error) {
      console.error('Error while applying for project', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

module.exports = {
  getApplicationsByProjectIdHandler,
  getApplicationByApplicationIdHandler,
  applyProjectHandler
};
