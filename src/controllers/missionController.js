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

        res.status(error.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la peticion",
            data: { error: error?.message || error}
        });
    }
}

const updateOneMission = async(req, res) => {

    const { body, params: { id }} =  req;

    try {
        const updateMission = await missionService.updateOneMission(id, body);
        console.log(updateMission);

        if(!updateMission){
            return res.status(404).send({
                status: "FAILED",
                data: { error: `Can't find artifact with the id '${id}' `}
            });
        }

        res.send({
            status: "OK",
            data: updateMission
        })
    }
    catch (error){
        
        res.status(error?.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la peticion",
            data: { error: error?.message || error }
        })
    }
}

module.exports = {
    getAllMissions,
    updateOneMission
}