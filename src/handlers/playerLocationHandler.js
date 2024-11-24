const playerService = require('../services/playerService.js');

const playerLocationHandler = (socket) => {

    socket.on('UpdateLocation', async (value) => {
        
        const changes =
        {
            location: value.location
        }
        
        const updatePlayer = await playerService.updateOnePlayerLocation(value.playerID, changes);
    })
}

module.exports = {
    playerLocationHandler
}