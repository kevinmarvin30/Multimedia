const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantryController');

router.get('/:userId', pantryController.getUserPantry);

module.exports = router;