const mongoose = require('mongoose');

const { Schema } = mongoose;

const artifactSchema = new Schema({
    cordinate: {
        latitude: Number,
        altitude: Number
    },
    isRetrieved: Boolean,
    image: String,
    markerImage: String,
    title: String,
    description: String,

});

module.exports = mongoose.model('Artifact', artifactSchema);