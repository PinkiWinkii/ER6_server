const playerService = require('../services/playerService.js');

const playerBetrayerHandler = (socket, io) => {

    socket.on('UpdateBetrayer', async (value) => {

        const changes =
        {
            isBetrayer: !value.isBetrayer
        }

        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value.playerID, changes);
        io.emit('IsBetrayer', { isBetrayer: updatePlayer.isBetrayer, playerID: value.playerID });
    })
}

module.exports = {
    playerBetrayerHandler
}