const express = require('express');
const router  = express.Router();

const playerController  = require('../controllers/playerController');
const middleware        = require('../middleware/verifyData');

router.get("/", playerController.getAllPlayers);
router.post("/", middleware.verify, playerController.addNewPlayer);
router.get("/:playerEmail", middleware.verifyGetOneByEmail, playerController.getPlayerByEmail);
router.patch("/:playerId", middleware.verifyId, playerController.updateOnePlayer);
module.exports = router;