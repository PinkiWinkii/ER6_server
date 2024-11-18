
const locationHandler = (socket, io) => {
    socket.on('sendLocation', (value) => {
        console.log("ENVIA SOCKET CON CORDENADAS NUEVAS");
        socket.broadcast.emit('updatedCoordinates', value);
        
        console.log("DATOS " + JSON.stringify(value));
    });
}

const requestLocation = (socket) => {
    socket.broadcast.emit('requesLocation');
}

module.exports = {
    locationHandler,
    requestLocation
}