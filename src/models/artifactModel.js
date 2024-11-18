const mongoose = require('mongoose');

const { Schema } = mongoose;

const artifactSchema = new Schema({
    coordinate: {
        latitude: Number,
        longitude: Number
    },
    isRetrieved: Boolean,
    image: String,
    markerImage: String,
    title: String,
    description: String,
    avatar: String
});

module.exports = mongoose.model('Artifact', artifactSchema);