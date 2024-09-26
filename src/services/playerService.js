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

module.exports = {
    getAllPlayers,
    addNewPlayer
}