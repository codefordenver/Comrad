const router = require('express').Router();
const v1Routes = require('./routes');

router.use('/v1', v1Routes);

module.exports = router;
