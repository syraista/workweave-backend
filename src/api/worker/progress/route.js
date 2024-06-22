const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getProgressByProjectIdHandler,
  getProgressByProgressIdHandler,
  submitProgressHandler,
} = require('./controller');

router.get('/', getProgressByProjectIdHandler);
router.get('/:progressId', getProgressByProgressIdHandler);
router.put('/:progressId', submitProgressHandler);

module.exports = router;
