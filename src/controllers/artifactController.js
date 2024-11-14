const artifactService = require('../services/artifactService');
const { getSocket } = require('../socket');

const getAllArtifacts = async (req, res) => {

    try {
        const allArtifacts = await artifactService.getAllArtifacts();
        if(allArtifacts.length === 0){
            return res.status(404).send({
                message: 'No existen Artifacts',
            });
        }

        res.send({ status: 'OK', data: allArtifacts });
    }
    catch (error){

        res
            .status(error?.status || 500)
            .send({
                status: 'FAILED',
                message: 'Error al realizar la peticion',
                data: { error: error?.message || error }
            });
    }
}

const updateOneArtifact = async (req, res) => {
    const { body, params : { id } } = req;

    try {
        const updateArtifact = await artifactService.updateOneArtifact(id, body);

        if(!updateArtifact){
            return res.status(400).send({
                status: "FAILED",
                data: { error: `Can't find artifact with the id '${id}' `}
            })
        }

        const io = getSocket();
        io.emit('updateArtifact', { updateArtifact });

        res.send({ status: "OK" , data: updateArtifact });
    }
    catch (error){

        res.send(error?.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la peticion",
            data: { error: error?.message || error }
        });
    }
}

module.exports = {
    getAllArtifacts,
    updateOneArtifact
}