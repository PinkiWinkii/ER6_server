const playerService = require('../services/playerService.js');

const playerBetrayerHandler = (socket, io) => {

    socket.on('UpdateBetrayer', async (value) => {

        //Hacer fetch a kaotika
        const updateResponse = await fetch(`https://kaotika-server.fly.dev/loyalty/email/${value.email}`, {
            method: 'PATCH'
        });

        console.log('RESPONSE IN PATCH PLAYER IN KAOTIKA:');
        console.log(updateResponse);
    
        const data = await updateResponse.json();
        //Añades al json del patch tanto el oro como el inventario

        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value._id, data);
        io.emit('IsBetrayer', updatePlayer);
    })
}

module.exports = {
    playerBetrayerHandler
}