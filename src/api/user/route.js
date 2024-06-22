const express = require('express');
const router = express.Router();

const { 
  getUserDataHandler,
  updateUserHandler,
  getWorkerDataByProjectIdHandler
 } = require('./controller');

router.get('/:userId', getUserDataHandler);
router.put('/update/:userId', updateUserHandler)
router.get('/worker-data/:projectId', getWorkerDataByProjectIdHandler);

module.exports = router;
