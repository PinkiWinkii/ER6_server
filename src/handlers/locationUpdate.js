
const locationHandler = (socket, io) => {
    socket.on('sendLocation', (value) => {
        console.log("ENVIA SOCKET CON CORDENADAS NUEVAS");
        socket.broadcast.emit('updatedCoordinates', value);
        
        console.log("DATOS " + JSON.stringify(value));
    });
}

module.exports = {
    locationHandler
}