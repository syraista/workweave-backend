const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getApplicationsByProjectIdHandler, // mendapatkan tawaran per projek tertentu
  getApplicationByApplicationIdHandler, // mendapatkan tawaran tertentu pada projek tertentu
  updateApplicationStatusByApplicationIdHandler
} = require('./controller');

router.get('/', getApplicationsByProjectIdHandler); 
router.get('/:applicationId', getApplicationByApplicationIdHandler);
router.put('/:applicationId', updateApplicationStatusByApplicationIdHandler);

module.exports = router;
