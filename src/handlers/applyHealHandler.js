const playerService = require('../services/playerService');

const applyHealHandler = (socket, io) => {

    socket.on("applyHeal", async (value) => {

        console.log("PLAYER HEALED IN SERVER:"); 

        io.emit('updateHeal' , value);
    })
}

    module.exports = {
      applyHealHandler,
}