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

const updateOneArtifact = async(artifactId, changes) => {
    try  {
        const updateArtifact = Artifact.updateOneArtifact(artifactId, changes);
        return updateArtifact;
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    getAllArtifacts,
    addNewArtifact,
    updateOneArtifact
}