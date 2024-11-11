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

module.exports = {
    getAllArtifacts
}