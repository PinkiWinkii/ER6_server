const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema({
    attributes:     {},
    equipment:      {},
    inventory:      {},
    name:           String,
    nickname:       String,
    email:          String,
    level:          Number,
    experience:     Number,
    is_active:      Boolean,
    profile:        {},
    tasks:          [],
    gold:           Number,
    created_date:   String,
    rol:            String,
    socketId:       String,
    isInsideLab:    Boolean,
    avatar:         String

})

// Export model
module.exports = mongoose.model('Player', playerSchema);