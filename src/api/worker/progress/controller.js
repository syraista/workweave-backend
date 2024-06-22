const { body, param, validationResult } = require('express-validator');
const { 
  submitProgress,
  getProgressByProjectId,
  getProgressByProgressId
} = require('./service');

const submitProgressHandler = [
  // Input validation
  param('projectId').isUUID().withMessage('Project ID must be a valid UUID'),
  param('progressId').isUUID().withMessage('Progress ID must be a valid UUID'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('status').isIn(['not_started', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('document_url').isURL().optional(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const updatedProgress = await submitProgress(req.params.projectId, req.params.progressId, req.body);
      res.status(200).json({ status: "success", data: { updatedProgress } });
    } catch (error) {
      console.error('Error while updating progress', error.message);
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
  submitProgressHandler,
  getProgressByProjectIdHandler,
  getProgressByProgressIdHandler
};
