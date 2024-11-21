
const artifactsValideatedHandler = (socket) => {
    socket.on('validatedArtifacts', () => {

        console.log("Socket validate artifacts recibido");
        socket.broadcast.emit('setArtifacts');
    });
}

module.exports = artifactsValideatedHandler;