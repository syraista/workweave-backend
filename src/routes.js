const express = require('express');
const router = express.Router();

const clientProjects = require('./api/client/project/route');
const workerProjects = require('./api/worker/project/route');
const authUser = require('./api/auth/route');
const user = require('./api/user/route');

// client
router.use('/client/projects', clientProjects);
router.use('/worker/projects', workerProjects);
router.use('/auth', authUser)
router.use('/user', user)

module.exports = router;
