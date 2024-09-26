const playerService = require('../services/playerService');

const getAllPlayers = async (req, res) => {

    try {

        const allPlayers = await playerService.getAllPlayers();
        if(allPlayers.length === 0){
            return res.status(404).send({ message: 'No existen players' });
        }
        res.send({ status: "OK", data: allPlayers});

    }catch (error){

        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la peticion",
                "data": { error: error?.message || error}
            })
    }
}

const addNewPlayer = async (req, res) => {

    const { body } = req;

    const newPlayer = {
        attributes:     body.attributes,
        equipment:      body.equipment,
        inventory:      body.inventory,
        name:           body.name,
        level:          body.level,
        experience:     body.experience,
        is_active:      body.is_active,
        profile:        body.profile,
        taks:           body.tasks,
        gold:           body.gold,
        created_date:   body.created_date
    }

    try {
        const createdPlayer = await playerService.addNewPlayer(newPlayer);
        res.status(201).send({
            status: "OK",
            data: createdPlayer
        });
    }
    catch (error){

        res.status(error?.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la petición",
            data: { error: error?.message || error }
        });
    }
}

module.exports = {
    getAllPlayers,
    addNewPlayer
}