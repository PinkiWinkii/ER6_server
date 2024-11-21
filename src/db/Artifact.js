const Artifact = require('../models/artifactModel');

const getAllArtifacts = async () => {
    try {
        const artifacts = await Artifact.find();
        return artifacts;
    }
    catch (error){
        throw error;
    }
}

const getStateArtifacts = async(id) => {
    try {
        const artifact = await Artifact.findById(id);
        return artifact
    }
    catch (error){
        throw error;
    }
}

const addNewArtifact = async (newArtifact) => {
    try {
        let artifactToInsert = new Artifact(newArtifact);
        const createdArtifact = await artifactToInsert.save();
        return createdArtifact;
    }
    catch (error){

        throw error;
    }
}

const updateOneArtifact = async(artifactId, changes) => {
    try {
        let updateArtifact = await Artifact.findByIdAndUpdate(artifactId, {$set: changes}, {new: true});
        return updateArtifact;
    }
    catch(error){

        throw error;
    }
}


module.exports = {
    getAllArtifacts,
    addNewArtifact,
    updateOneArtifact,
    getStateArtifacts
}