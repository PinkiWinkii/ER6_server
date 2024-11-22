const express = require('express');
const router = express.Router();

const missionController = require('../controllers/missionController');

router.get('', missionController.getAllMissions);

module.exports = router;