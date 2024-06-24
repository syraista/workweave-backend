const express = require('express');
const router = express.Router();

const { 
  getUserDataHandler,
  getUserDataByWorkerIdHandler,
  updateUserHandler,
  getWorkerDataByProjectIdHandler,
  getApplicationByWorkerIdHandler
 } = require('./controller');

router.get('/:userId', getUserDataHandler);
router.get('/worker/:workerId', getUserDataByWorkerIdHandler);
router.put('/update/:userId', updateUserHandler)
router.get('/worker-data/:projectId', getWorkerDataByProjectIdHandler);
router.get('/applications/:workerId', getApplicationByWorkerIdHandler)

module.exports = router;
