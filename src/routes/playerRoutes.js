const express = require('express');
const router  = express.Router();

const playerController  = require('../controllers/playerController');
const middleware        = require('../middleware/verifyData');


router.get("/", playerController.getAllPlayers);
router.post("/", middleware.verify, playerController.addNewPlayer);
router.get("/:playerEmail", middleware.verifyGetOneByEmail, playerController.getPlayerByEmail);
// PATCH HACE EL EVENTO DE ACTUALIZAR EN TIEMPO REAL
router.patch("/:playerId", middleware.verifyId, playerController.updateOnePlayer);

// Actualizar el player por email
router.patch("/email/:playerEmail", middleware.verifyGetOneByEmail, playerController.updateOnePlayerByEmail);


router.patch("/:playerEmail", middleware.verifyId, playerController.updateOnePlayer);
module.exports = router;