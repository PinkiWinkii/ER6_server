const playerService = require('../services/playerService.js');

const angeloCapturedHandler = (socket, io) => {

    socket.on('UpdateCaptured', async (value) => {

        const changes =
        {
            isCaptured: !value.isCaptured
        }

        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value.playerID, changes);

        io.emit('IsCaptured', { isCaptured: updatePlayer.isCaptured, playerID: value.playerID });
    })
}

module.exports = {
    angeloCapturedHandler
}