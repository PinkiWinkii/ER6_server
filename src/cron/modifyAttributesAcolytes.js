const cron = require('node-cron');
const PlayerService = require('../services/playerService');

const modifyAttributtesAcolytes = async() => {

    cron.schedule('*/30 * * * *', async() => {
        const players =  await PlayerService.getAllPlayers();
        const acolytes = players.filter((player) => player.role === 'ACOLYTE');

        console.log('running a task every minute');

        for(let i = 0; i < acolytes.length; i++){            
            const acolyte = acolytes[i];

            // Effects only to not betrayers
            if(!acolyte.isBetrayer){
                const attributes = acolyte.attributes;
                const acolyteId = acolyte._id;
    
                const newResistence = attributes.resistence - 0.10;
                PlayerService.updateOnePlayer(acolyteId, { 'attributes.resistence' : newResistence });
                modifyAttibuteAcordingResistence(newResistence, attributes, acolyteId);
                throwIlnessAleatory(acolyteId, attributes);
            }

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
    
    }else if(resistence > 30){

        const newInsanity = Math.floor(attributes.insanity + (50 - resistence));
        PlayerService.updateOnePlayer(playerId, {'modifiedAttributes.insanity' : newInsanity});
    
    }else {
        // Opcion para cuando la resistencia es menor a 30
    }

}

const throwIlnessAleatory = (playerId, attributes) => {

    const ilness = Math.floor(Math.random() * 30);


    const ILNESS = {
        PUTRID_PLAGUE: 10,
        EPIC_WEAKNESS: 20,
        MEDULAR_APOCALYPSE: 30
    }

    switch(ilness){
        case ILNESS.PUTRID_PLAGUE:
            const newIntelligence = Math.floor(attributes.intelligence - (attributes.intelligence * 0.75));
            PlayerService.updateOnePlayer(playerId, { putridPlague: true,  'modifiedAttributes.intelligence' : newIntelligence });
            console.log(`player with the id ${playerId} has infected with Putrid plague`);
            break;

        case ILNESS.EPIC_WEAKNESS:
            const newStrength = Math.floor(attributes.strength - (attributes.strength * 0.6));
            PlayerService.updateOnePlayer(playerId, { epicWeakness: true , 'modifiedAttributes.strength' : newStrength});
            console.log(`player with the id ${playerId} has infected with Epic weakness`);
            break;

        case ILNESS.MEDULAR_APOCALYPSE:
            const newConstitution = Math.floor(attributes.constitution - (attributes.constitution * 0.3));
            PlayerService.updateOnePlayer(playerId, { medularApocalypse: true , 'modifiedAttributes.constitution' : newConstitution});
            console.log(`player with the id ${playerId} has infected with Medular Apocalypse`);
            break;
    }
}


module.exports = modifyAttributtesAcolytes; 