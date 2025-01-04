const playerService = require('../services/playerService.js');

const angeloArrestedHandler = (socket, io) => {

    socket.on('ArrestAngelo', () => {
        console.log("SEND ARREST TO MORTIMER");

        io.emit('ArrestingAngelo');
    })

    socket.on('NotArrestAngelo', () => {

        io.emit('NotArrestingAngelo');
    })

    socket.on('UpdateArrested', async (value) => {

        const changes =
        {
            isArrested: !value.isArrested
        }

        const updatePlayer = await playerService.updateOnePlayerIsArrested(value.playerID, changes);

        console.log("ANGELO IS ARRESTED IN SERVER?");
        console.log(updatePlayer.isArrested);


        io.emit('IsArrested', { isCaptured: updatePlayer.isCaptured, playerID: value.playerID });
    })
}

module.exports = {
    angeloArrestedHandler
}