const Mission = require('../models/missionModel');

const getAllMissions = async() => {
    try {
        const mission = await Mission.find();
        return mission
    }
    catch (error){
        throw error;
    }
}

const updateOneMission = async(missionId, changes) => {
    try {
        const mission = await Mission.findByIdAndUpdate(missionId, {$set: changes}, {new: true});
        return mission;
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    getAllMissions,
    updateOneMission
}