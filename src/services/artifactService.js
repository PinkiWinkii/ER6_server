const Artifact = require('../db/Artifact');

const getAllArtifacts = async () => {
    try {
        const allArtifacts = Artifact.getAllArtifacts();
        return allArtifacts;
    }
    catch (error){

        throw error;
    }
}

const addNewArtifact = async (newArtifact) => {
    try {
        const newArtifactAdded = Artifact.addNewArtifact(newArtifact);
        return newArtifactAdded;
    }
    catch (error){
        
        throw error;
    }
}

module.exports = {
    getAllArtifacts,
    addNewArtifact
}