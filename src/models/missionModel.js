const moongose = require('mongoose');

const { Schema } = moongose;

const misionModel = new Schema({
    name: String,
    Description: String,
    isCompleted: Boolean
});

module.exports = moongose.model('Mission', misionModel);