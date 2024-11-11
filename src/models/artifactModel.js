const mongoose = require('mongoose');

const { Schema } = mongoose;

const artifactSchema = new Schema({
    latitude: String,
    altitude: String,
    isRetrieved: Boolean,
});

module.exports = mongoose.model('Artifact', artifactSchema);