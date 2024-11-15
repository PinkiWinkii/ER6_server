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
    role:           String,
    socketId:       String,
    isInsideLab:    Boolean,
    avatar:         String,
    isInsideTower:  Boolean,
    AccessTowerId:  String,
    fcmToken: String,
    location: String,
    isInsideHall: Boolean
})

// Export model
module.exports = mongoose.model('Player', playerSchema);