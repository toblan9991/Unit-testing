const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationControllers');

router.post('/', locationController.createLocation);
router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocationById);


module.exports = router;

