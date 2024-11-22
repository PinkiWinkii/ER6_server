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

module.exports = {
    getAllMissions
}