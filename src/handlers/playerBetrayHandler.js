const playerService = require('../services/playerService.js');

const playerBetrayerHandler = (socket, io) => {

    socket.on('UpdateBetrayer', async (value) => {

        const data = {
            isBetrayer: true
        }

        console.log('RESPONSE JSON DATA IN PATCH PLAYER IN KAOTIKA:');
        //Añades al json del patch tanto el oro como el inventario
        console.log(data);


        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value._id, data);
        io.emit('IsBetrayer', updatePlayer);
    })
}

module.exports = {
    playerBetrayerHandler
}