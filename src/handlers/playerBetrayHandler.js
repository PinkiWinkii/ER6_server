const playerService = require('../services/playerService.js');

const playerBetrayerHandler = (socket, io) => {

    socket.on('UpdateBetrayer', async (value) => {

        //Hacer fetch a kaotika

        //Añades al json del patch tanto el oro como el inventario
        
        const changes =
        {
            isBetrayer: !value.isBetrayer,
        }

        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value._id, changes);
        io.emit('IsBetrayer', updatePlayer);
    })
}

module.exports = {
    playerBetrayerHandler
}