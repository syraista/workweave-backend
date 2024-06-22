const express = require('express');
const router = express.Router();

const { 
  createProjectHandler,
  getAllProjectsHandler,
  getProjectByIdHandler,
  getProjectsByClientIdHandler,
  updateProjectByIdHandler,
  deleteProjectByIdHandler
 } = require('./controller');

const applicationsRouter = require('../application/route');

const progressRouter = require('../progress/route');

router.post('/', createProjectHandler);
router.get('/', getAllProjectsHandler);
router.get('/:id', getProjectByIdHandler);
router.get('/client/:clientId', getProjectsByClientIdHandler);
router.put('/:id', updateProjectByIdHandler);
router.delete('/:id', deleteProjectByIdHandler);

router.use('/:projectId/applications', applicationsRouter);
router.use('/:projectId/progress', progressRouter);

module.exports = router;
