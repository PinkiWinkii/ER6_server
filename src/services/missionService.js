const Mission = require('../db/Mission');

const getAllMissions = async() => {
    try {
        const missions =  await Mission.getAllMissions();
        return missions; 
    }
    catch (error){
        throw error;
    }
}

const updateOneMission = async (missionId, changes) => {
    try {
        const mission = await Mission.updateOneMission(missionId, changes);
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