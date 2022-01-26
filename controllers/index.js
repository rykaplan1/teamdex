const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/');
router.use('/api', apiRoutes);

module.exports = router;
