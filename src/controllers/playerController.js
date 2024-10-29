const { Socket } = require('socket.io');
const playerService = require('../services/playerService');
const { getSocket } = require('../socket');


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

    const { body }    = req;
    const role        = manageRole(body.email);

    const newPlayer = {
        attributes:     body.attributes,
        equipment:      body.equipment,
        inventory:      body.inventory,
        name:           body.name,
        email:          body.email,
        nickname:       body.nickname,
        level:          body.level,
        experience:     body.experience,
        is_active:      body.is_active,
        profile:        body.profile,
        taks:           body.tasks,
        gold:           body.gold,
        created_date:   body.created_date,
        role:           role,                   // Asignar role desde server    
        socketId:       body.socketId,
        isInsideLab:    false,                  // Inicializo en false siempre
        avatar:         body.avatar, 
        isInsideTower:  false,
        AccesTowerID:   ''
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

const manageRole = (email) => {
    let role;
    console.log("El email del usuario autenticado es: " + email);
    
    const ISTVAN_EMAIL    = "classcraft.daw2@aeg.eus";
    const MORTIMER_EMAIL  = "oskar.calvo@aeg.eus";
    const VILLAIN_EMAIL   = "ozarate@aeg.eus";
    const ACOLYTE_EMAIL   = "@ikasle.aeg.eus";

    switch (email) {
        case ISTVAN_EMAIL:
            role = 'ISTVAN'
            break;

        case VILLAIN_EMAIL:
            role = 'VILLANO'
            break;

        case MORTIMER_EMAIL:
            role = 'MORTIMER'
            break;

        default:
            if (email && email.endsWith(ACOLYTE_EMAIL)) {
                role = 'ACOLYTE'
            } else {
                role = "UNKNOWN ROLE"
            }
            break;
    }

    return role;
}

const getPlayerByEmail = async (req, res) => {

    const { params : { playerEmail }} = req;
    
    try {
        const player = await playerService.getPlayerByEmail(playerEmail);
        if(!player){
            return res.status(400).send({
                status: "FAILED",
                data: { error: `Can't find player with the email '${playerEmail}' `}

            });
        }

        res.send({ status: "OK" , data: player});
    } catch (error){

        res.status(error?.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la peticion",
            data: { error: error?.message || error}
        })
    }
}

const updateOnePlayer = async (req, res) => {

    const { body, params : { playerId } } = req;

    try {
        const updatePlayer = await playerService.updateOnePlayer(playerId, body);

        if(!updatePlayer){
            return  res.status(400).send({
                status: "FAILED",
                data: { error: `Can't find player with the id '${playerId}'`}
            })
        }

        const io = getSocket();
        io.emit('update' , {playerId, isInsideLab: updatePlayer.isInsideLab});

        res.send({ status: "OK", data: updatePlayer});
    }
    catch (error){

        res.status(error?.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la peticion",
            data: { error: error?.message || error}
        });
    }
}

const updateOnePlayerByEmail = async (req, res) => {

    const { body, params : { playerEmail } } = req;

    try {
        const updatePlayer = await playerService.updateOnePlayerByEmail(playerEmail, body);

        if(!updatePlayer){

            return res.status(400).send({
                status: "FAILED",
                data:   { error: `Can't find player with the email ${playerEmail}`}
            });
        }

        res.send({ status: "OK", data: updatePlayer});
    }
    catch (error){

        res.status(error?.status || 500).send({
            status: "FAILED",
            message: "Error al realizar la petición",
            data:   { error: error?.message || error}
        })
    }
}

module.exports = {
    getAllPlayers,
    addNewPlayer,
    getPlayerByEmail,
    updateOnePlayer,
    updateOnePlayerByEmail
}