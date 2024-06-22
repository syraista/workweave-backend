const express = require('express');
const router = express.Router();

const { 
  registerHandler,
  loginHandler,
  logoutHandler,
  checkSessionHandler
 } = require('./controller');

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);
router.get('/checkSession/:sessionId', checkSessionHandler);

module.exports = router;
