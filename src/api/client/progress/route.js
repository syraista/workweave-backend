const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getProgressByProjectIdHandler,
  getProgressByProgressIdHandler,
  createProgressHandler,
} = require('./controller');

router.get('/', getProgressByProjectIdHandler);
router.get('/:progressId', getProgressByProgressIdHandler);
router.post('/', createProgressHandler);

module.exports = router;
