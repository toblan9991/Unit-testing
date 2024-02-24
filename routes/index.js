const express = require('express');
const charactersRouter = require('./characters');
const locationsRouter = require('./locations');

const router = express.Router();

router.use('/api/v1/heroes', charactersRouter);
router.use('/api/v1/villains', charactersRouter);
router.use('/api/v1/locations', locationsRouter);

module.exports = router;
