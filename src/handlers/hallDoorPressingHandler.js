const playerService = require('../services/playerService');

const hallDoorPressingHandler = (socket, io) => {

    socket.on("HallDoorPressed", async (value) => {

        const playerId = value.playerID;
        const changes =
        {
            isInsideHall: !value.isInsideHall,
        }
    
        const updatePlayer = await playerService.updateOnePlayerIsInsideHall(playerId, changes);
    
        console.log("IS INSIDE HALL VALUES IN SERVER:");
    
        console.log(updatePlayer.isInsideHall);
        console.log(!value.isInsideHall);
    
        io.emit('updateMyHall' , {nickname: updatePlayer.nickname, playerId, isInsideHall: updatePlayer.isInsideHall});
    })
}

    module.exports = {
        hallDoorPressingHandler,
}