const router = require('express').Router();

const albumRoutes = require('./album');
const userRoutes = require('./user');

router.use('/album', albumRoutes);
router.use('/user', userRoutes);

module.exports = router;