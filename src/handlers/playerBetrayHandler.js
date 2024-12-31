const playerService = require('../services/playerService.js');

const playerBetrayerHandler = (socket) => {

    socket.on('UpdateBetrayer', async (value) => {

        const changes =
        {
            isBetrayer: !value.isBetrayer
        }

        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value.playerID, changes);
    })
}

module.exports = {
    playerBetrayerHandler
}