const express = require('express');
const router = express.Router();

const artifactController = require('../controllers/artifactController');

router.get("/", artifactController.getAllArtifacts);

module.exports = router;