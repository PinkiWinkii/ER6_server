const playerService = require('../services/playerService');

const appliedCursesHandler = (socket, io) => {

    socket.on("applyCurse", async (value) => {

        console.log("PLAYER CURSES IN SERVER:"); 
        console.log(value.curses);

        io.emit('updatePlayerCurses' , value);
    })
}

    module.exports = {
      appliedCursesHandler,
}