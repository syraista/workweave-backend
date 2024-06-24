const express = require('express');
const router = express.Router();

const { 
  getUserDataHandler,
  updateUserHandler,
  getWorkerDataByProjectIdHandler,
  getApplicationByWorkerIdHandler
 } = require('./controller');

router.get('/:userId', getUserDataHandler);
router.put('/update/:userId', updateUserHandler)
router.get('/worker-data/:projectId', getWorkerDataByProjectIdHandler);
router.get('/applications/:workerId', getApplicationByWorkerIdHandler)

module.exports = router;
