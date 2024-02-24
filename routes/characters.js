const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterControllers'); 

// Routes for heroes
router.get('/heroes/:id', characterController.getCharacterById);
router.get('/heroes', characterController.getCharacters);
router.post('/heroes', characterController.createCharacter);

// Routes for villains
router.get('/villains/:id', characterController.getCharacterById);
router.get('/villains', characterController.getCharacters);
router.post('/villains', characterController.createCharacter);

module.exports = router;
