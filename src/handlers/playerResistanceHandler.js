const playerService = require('../services/playerService.js');

const playerResistanceHanler = (socket, io) => {

    socket.on('rest', async (value) => {
        
        const changes = { 'attributes.resistence': value.resistence};
        const updatePlayer = await playerService.updateOnePlayer(value.playerID, changes);

        io.emit('changeResistence', updatePlayer);

        console.log("LLega socket rest");
    })
}

module.exports = {
    playerResistanceHanler
}