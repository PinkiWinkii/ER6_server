const express = require('express');
const router  = express.Router();

const playerController  = require('../controllers/playerController');
const middleware        = require('../middleware/verifyData');

router.get("/", playerController.getAllPlayers);
router.post("/", middleware.verify, playerController.addNewPlayer);

module.exports = router;