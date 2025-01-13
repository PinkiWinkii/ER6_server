const playerService = require('../services/playerService.js');

const playerBetrayerHandler = (socket, io) => {

    socket.on('UpdateBetrayer', async (value) => {

        //Hacer fetch a kaotika
        const updateResponse = await fetch(`https://kaotika-server.fly.dev/players/loyalty/email/${value.email}`, {
            method: 'PATCH'
        });

        console.log('RESPONSE IN PATCH PLAYER IN KAOTIKA:');
        console.log(updateResponse);
    
        const data = await updateResponse.data.json();

        console.log('RESPONSE IN PATCH PLAYER IN KAOTIKA:');
        //Añades al json del patch tanto el oro como el inventario
        console.log(data);
        

        const updatePlayer = await playerService.updateOnePlayerIsBetrayer(value._id, data);
        io.emit('IsBetrayer', updatePlayer);
    })
}

module.exports = {
    playerBetrayerHandler
}