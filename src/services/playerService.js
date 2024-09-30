const Player = require('../db/Player')

const getAllPlayers = async () => {

    try {

        const allPlayers = Player.getAllPlayers();
        return allPlayers;
    }
    catch (error){

        throw error;
    }
}

const addNewPlayer = async (newPlayer) => {

    try {
        const  newPlayerAdded = Player.addNewPlayer(newPlayer);
        return newPlayerAdded;
    } 
    catch (error){

        throw error;
    }
}

const getPlayerByEmail = async (playerEmail) => {

    try {
        const player = Player.getPlayerByEmail(playerEmail);
        return player;
    }
    catch (error){

        throw error;
    }
}

const updateOnePlayer = async(playerId, changes) => {

    try {
        const updatePlayer = Player.updateOnePlayer(playerId, changes);
        return updatePlayer;
    }
    catch (error) {

        throw error;
    }
}

module.exports = {
    getAllPlayers,
    addNewPlayer,
    getPlayerByEmail,
    updateOnePlayer
}