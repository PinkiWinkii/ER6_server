const playerService = require('../services/playerService');

const applyEthaziumHandler = (socket, io) => {

    socket.on("applyEthazium", async (value) => {

        console.log("PLAYER ETHAZIUM IN SERVER:"); 
        console.log(value.ethazium);

        io.emit('updateEthazium' , value);
    })
}

    module.exports = {
      applyEthaziumHandler,
}