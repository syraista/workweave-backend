const express = require('express');
const router = express.Router();

const { 
  getAllProjectsHandler,
  getProjectByIdHandler,
 } = require('./controllers');

const applicationsRouter = require('../application/route');
const progressRouter = require('../progress/route');

router.get('/', getAllProjectsHandler);
router.get('/:id', getProjectByIdHandler);

router.use('/:projectId/applications', applicationsRouter);
router.use('/:projectId/progress', progressRouter);

module.exports = router;
