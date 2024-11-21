const artifactService = require('../services/artifactService');

const artifactsStateHandler = async(socket) => {
    const state = await artifactService.getStateArtifacts();

    socket.on('requestArtifactsState' , () => { 

        console.log("Envia socket respuesta con " + state);
        socket.emit('responseArtifactsState', state);
    });
}

module.exports = artifactsStateHandler;