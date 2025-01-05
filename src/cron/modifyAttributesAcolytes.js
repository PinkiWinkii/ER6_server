const cron = require('node-cron');
const PlayerService = require('../services/playerService');

const modifyAttributtesAcolytes = async() => {

    cron.schedule('*/30 * * * *', async() => {
        const players =  await PlayerService.getAllPlayers();
        const acolytes = players.filter((player) => player.role === 'ACOLYTE');

        console.log('running a task every minute');

        for(let i = 0; i < acolytes.length; i++){
            const acolyte = acolytes[i];

            const newResistence = acolyte.attributes.resistence - 0.10;
            PlayerService.updateOnePlayer(acolyte._id, { 'attributes.resistence' : newResistence });
            modifyAttibuteAcordingResistence(newResistence, acolyte.attributes, acolyte._id);
        }

    });
}

const modifyAttibuteAcordingResistence = async(resistence, attributes, playerId) => {

    if(resistence > 50){
        const newStrength = Math.floor(attributes.strength * (resistence / 100));
        const newDexterity = Math.floor(attributes.dexterity * (resistence / 100));
        const newIntelligence = Math.floor(attributes.intelligence * (resistence / 100));

        const newModifiedAttributes = {
            strength: newStrength,
            dexterity: newDexterity,
            intelligence: newIntelligence
        }

        PlayerService.updateOnePlayer(playerId,  {modifiedAttributes: newModifiedAttributes });
    
    }else {

        const newInsanity = Math.floor(attributes.insanity + (50 - resistence));
        PlayerService.updateOnePlayer(playerId, {'modifiedAttributes.insanity' : newInsanity});
    }

}


module.exports = modifyAttributtesAcolytes; 