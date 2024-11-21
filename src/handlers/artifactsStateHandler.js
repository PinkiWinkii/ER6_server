const artifactService = require('../services/artifactService');

const artifactsStateHandler = async(socket, id) => {
    const artifact = await artifactService.getStateArtifacts(id);

    console.log(JSON.stringify(artifact));
    const state = artifact.isRetrieved;

    socket.on('requestArtifactsState' , () => { 

        console.log("Envia socket respuesta con " + state);
        socket.emit('responseArtifactsState', state);
    });
}

module.exports = artifactsStateHandler;