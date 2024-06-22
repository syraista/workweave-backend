const { body, param, validationResult } = require('express-validator');
const { 
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByClientId,
  updateProjectById,
  deleteProjectById
} = require('./service');

const createProjectHandler = [
  // Input validation
  body('client_id').isUUID().withMessage('Client ID must be a valid UUID'),
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('status').isIn(['open', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('document_url').isURL().optional(),
  body('category').isString().optional(),
  body('budget_lower').isDecimal().optional(),
  body('budget_upper').isDecimal().optional(),
  body('deadline').isISO8601().toDate().optional(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const newProject = await createProject(req.body);
      res.status(201).json({ status: "success", data: newProject });
    } catch (error) {
      console.error('Error while creating project', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getAllProjectsHandler = async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    if (projects.length) {
      res.status(200).json({ status: "success", data: { projects } });
    } else {
      res.status(404).json({ status: "error", message: 'Projects not found' });
    }
  } catch (error) {
    console.error('Error while getting all projects', error.message);
    next({ status: "error", message: "Unable to communicate with database" });
  }
};

const getProjectByIdHandler = [
  // Input validation
  param('id').isUUID().withMessage('ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const project = await getProjectById(req.params.id);
      if (project) {
        res.status(200).json({ status: "success", data: { project } });
      } else {
        res.status(404).json({ status: "error", message: 'Project not found' });
      }
    } catch (error) {
      console.error('Error while getting project by ID', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const getProjectsByClientIdHandler = [
  // Input validation
  param('clientId').isUUID().withMessage('Client ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const projects = await getProjectsByClientId(req.params.clientId);
      if (projects) {
        res.status(200).json({ status: "success", data: { projects } });
      } else {
        res.status(404).json({ status: "error", message: 'Project not found' });
      }
    } catch (error) {
      console.error('Error while getting project by Client ID', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const updateProjectByIdHandler = [
  // Validate the `id` param
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  // Validate the request body
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('status').isIn(['open', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('document_url').isURL().optional(),
  body('category').isString().optional(),
  body('budget_lower').isDecimal().optional(),
  body('budget_upper').isDecimal().optional(),
  body('deadline').isISO8601().toDate().optional(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const updatedProject = await updateProjectById(req.params.id, req.body);
      if (updatedProject) {
        res.status(200).json({ status: "success", data: { updatedProject } });
      } else {
        res.status(404).json({ status: "error", message: 'Project not found' });
      }
    } catch (error) {
      console.error('Error while updating project', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

const deleteProjectByIdHandler = [
  // Validate the `id` param
  param('id').isUUID().withMessage('ID must be a valid UUID'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    try {
      const result = await deleteProjectById(req.params.id);
      if (result) {
        res.status(200).json({ status: "success", data: { message: 'Project deleted successfully' } });
      } else {
        res.status(404).json({ status: "error", message: 'Project not found' });
      }
    } catch (error) {
      console.error('Error while deleting project', error.message);
      next({ status: "error", message: "Unable to communicate with database" });
    }
  }
];

module.exports = {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectByIdHandler,
  getProjectsByClientIdHandler,
  updateProjectByIdHandler,
  deleteProjectByIdHandler
};
