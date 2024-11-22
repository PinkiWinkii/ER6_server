const missionService = require('../services/missionService');

const getAllMissions = async(req, res) => {
    try {
        const allMissions = await missionService.getAllMissions();
        if(allMissions.length === 0 ){
            return res.status(404).send({
                message: "No existen Misiones"
            })
        }

        res.send({
            status : "OK",
            data: allMissions
        });
    }   
    catch (error) {

        res.sta(error.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la peticion",
            data: { error: error?.message || error}
        });
    }
}

module.exports = {
    getAllMissions
}