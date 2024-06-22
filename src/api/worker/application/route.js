const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getApplicationsByProjectIdHandler, // mendapatkan tawaran per projek tertentu
  getApplicationByApplicationIdHandler, // mendapatkan tawaran tertentu pada projek tertentu
  applyProjectHandler 
} = require('./controller');

router.get('/', getApplicationsByProjectIdHandler); 
router.get('/:applicationId', getApplicationByApplicationIdHandler);
router.post('/', applyProjectHandler);

module.exports = router;
