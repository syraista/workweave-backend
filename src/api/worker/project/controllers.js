const { param, validationResult } = require('express-validator');

const { 
  getAllProjects,
  getProjectById,
 } = require('./services');

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

module.exports = {
  getAllProjectsHandler,
  getProjectByIdHandler
};
