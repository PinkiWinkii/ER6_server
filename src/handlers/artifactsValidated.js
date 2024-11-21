
const artifactsValidatedHandler = (socket) => {
    socket.on('validatedArtifacts', () => {

        console.log("Socket validate artifacts recibido");
        socket.broadcast.emit('setArtifacts');
    });
}

const requestValidationToMortimer = (socket, io) => {
    socket.on('changeIsValidatingTrue', () => {
        console.log("Socket change is validating recibido");

        io.emit('changeIsValidating', true);
    });

    socket.on('changeIsValidatingFalse', () => {

        console.log("Socket is validating false")
        io.emit('changeIsValidating', false);
    });
}

module.exports = {
    artifactsValidatedHandler,
    requestValidationToMortimer
};