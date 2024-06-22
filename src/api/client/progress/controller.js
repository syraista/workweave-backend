const { body, param, validationResult } = require('express-validator');
const { 
  createProgress, 
  getProgressByProjectId,
  getProgressByProgressId 
} = require('./service');

const createProgressHandler = [
  // Input validation
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),
  body('workerId').isUUID().withMessage('Project ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }
    console.log(req.params.projectId)

    try {
      const newProgress = await createProgress(req.params.projectId, req.body);
      res.status(201).json({ status: "success", data: { progress: newProgress } });
    } catch (error) {
      console.error('Error while creating progress', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getProgressByProjectIdHandler = [
  // Input validation
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const progress = await getProgressByProjectId(req.params.projectId);
      if (progress.length) {
        res.status(200).json({ status: "success", data: { progress } });
      } else {
        res.status(404).json({ status: "error", message: 'Progress not found for the given project ID' });
      }
    } catch (error) {
      console.error('Error while retrieving progress by project ID', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getProgressByProgressIdHandler = [
  // Input validation
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),
  param('progressId').isUUID().withMessage('Progress ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const progress = await getProgressByProgressId(req.params.projectId, req.params.progressId);
      if (!progress) {
        return res.status(404).json({ status: "error", message: "Progress not found" });
      }
      res.status(200).json({ status: "success", data: progress });
    } catch (error) {
      console.error('Error while fetching progress by progress ID', error.message);
      next({ status: "error", message: "Unable to fetch progress data" });
    }
  }
];

module.exports = {
  createProgressHandler,
  getProgressByProjectIdHandler,
  getProgressByProgressIdHandler
};
