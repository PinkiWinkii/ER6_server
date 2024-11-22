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

module.exports = {
    getAllMissions,
}