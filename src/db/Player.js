const Player = require('../models/playerModel');

const getAllPlayers = async () => {
    try {
        const players = await Player.find();
        return players;
    } 
    catch (error){

        throw error;
    }
}

const addNewPlayer = async (newPlayer) => {

    try {
        let     playerToInsert = new Player(newPlayer);
        const   createdPlayer  = await playerToInsert.save();
        return  createdPlayer;

    } catch (error){

        throw error;
    }
}

const getPlayerByEmail = async (playerEmail) => {

    try {
        const player = await Player.findOne({ email: playerEmail});
        return player

    } 
    catch (error){
        throw error;
    }
}

const updateOnePlayer = async (playerId, changes) => {

    try {
        let updatePlayer = await Player.findByIdAndUpdate(playerId, {$set: changes} , {new: true});
        return updatePlayer;
    }
    catch (error){

        throw error;
    }

}

const updateOnePlayerByEmail = async (playerEmail, changes) => {

    try {
        let     updatePlayer = await Player.findOneAndUpdate({email: playerEmail},  {$set: changes}, {new: true});
        return  updatePlayer;
    }
    catch (error) {

        throw error;
    }
}

const verifyTowerAccesId = async ( towerId ) => {
    try {
        const player = await Player.find({ AccessTowerId: towerId });
        return player;
    }
    catch ( error ){

        throw error;
    }
}

module.exports = {
    getAllPlayers,
    addNewPlayer,
    getPlayerByEmail,
    updateOnePlayer,
    updateOnePlayerByEmail,
    verifyTowerAccesId
}