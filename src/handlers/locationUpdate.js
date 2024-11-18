
const locationHandler = (socket, io) => {
    socket.on('sendLocation', (value) => {
        console.log("ENVIA SOCKET CON CORDENADAS NUEVAS");
        socket.broadcast.emit('updatedCoordinates', value);
        
        console.log("DATOS " + JSON.stringify(value));
    });
}

const requestLocation = (socket) => {
    socket.on('requestLocation' , () => {
        socket.broadcast.emit('requestLocation');
    });
}

const deleteLocation = (socket) => {
    socket.on('deleteLocation', (playerId) => {
        console.log("ID ANTES DE ELIMINAR " + playerId);

        socket.broadcast.emit('deleteLocation', playerId);

        console.log('ID del player a eliminar ' + playerId);
    }); 
}

module.exports = {
    locationHandler,
    requestLocation,
    deleteLocation
}