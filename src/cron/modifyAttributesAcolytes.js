const cron = require('node-cron');
const PlayerService = require('../services/playerService');
const { getSocket } = require('../socket');

const modifyAttributtesAcolytes = async() => {
    cron.schedule('*/3 * * * *', async () => {
        const players = await PlayerService.getAllPlayers();
        const acolytes = players.filter(player => player.role === 'ACOLYTE');
    
        console.log('Running a task every 3 minutes');
    
        await Promise.all(acolytes.map(async (acolyte) => {
            const attributes = acolyte.attributes;
    
            if (!acolyte.isBetrayer && attributes.resistence > 0) {
                const acolyteId = acolyte._id;
                const newResistence = attributes.resistence - 10;
    
                try {
                    await PlayerService.updateOnePlayer(acolyteId, { 'attributes.resistence': newResistence });
                    await modifyAttibuteAcordingResistence(newResistence, attributes, acolyteId);
                    await throwIlnessAleatory(acolyteId, acolyte.modifiedAttributes, acolyte);
                } catch (error) {
                    console.error(`Error processing acolyte ${acolyteId}:`, error);
                }
            }
        }));
    });
}

const modifyAttibuteAcordingResistence = async(resistence, attributes, playerId, newResistence) => {

    const io = getSocket();
    
    if(resistence > 50){
        const newStrength = Math.floor(attributes.strength * (resistence / 100));
        const newDexterity = Math.floor(attributes.dexterity * (resistence / 100));
        const newIntelligence = Math.floor(attributes.intelligence * (resistence / 100));

        const newModifiedAttributes = {
            insanity: attributes.insanity,
            strength: newStrength,
            dexterity: newDexterity,
            intelligence: newIntelligence,
            charisma: attributes.charisma,
            constitution: attributes.constitution,
            resistence: newResistence
        }

        const updatePlayer = await PlayerService.updateOnePlayer(playerId,  {modifiedAttributes: newModifiedAttributes });
        io.emit('updateAll', updatePlayer);
        
    }else if(resistence >= 30){

        const newInsanity = Math.floor(attributes.insanity + (50 - resistence));
        const updatePlayer = await PlayerService.updateOnePlayer(playerId, {'modifiedAttributes.insanity' : newInsanity});
        io.emit('updateAll', updatePlayer);
    
    }else {
        // Opcion para cuando la resistencia es menor a 30
    }

}

const throwIlnessAleatory = async(playerId, attributes, player) => {
    const io = getSocket();

    if(player.putridPlague || player.epicWeakness || player.medularApocalypse || player.ethazium){
        console.log(`The player with the id ${playerId} has already an ilness or curse`);
        return;
    }

    const ilness = Math.floor(Math.random() * 30) + 1;


    const ILNESS = {
        PUTRID_PLAGUE: 10,
        EPIC_WEAKNESS: 20,
        MEDULAR_APOCALYPSE: 30
    }

    let updatePlayer;
    switch(ilness){
        case ILNESS.PUTRID_PLAGUE:
            const newIntelligence = Math.floor(attributes.intelligence - (attributes.intelligence * 0.75));
            updatePlayer = await PlayerService.updateOnePlayer(playerId, { putridPlague: true,  'modifiedAttributes.intelligence' : newIntelligence });
            io.emit('updateAll', updatePlayer);
            console.log(`player with the id ${playerId} has infected with Putrid plague`);
            break;

        case ILNESS.EPIC_WEAKNESS:
            const newStrength = Math.floor(attributes.strength - (attributes.strength * 0.6));
            updatePlayer = await PlayerService.updateOnePlayer(playerId, { epicWeakness: true , 'modifiedAttributes.strength' : newStrength});
            console.log(`player with the id ${playerId} has infected with Epic weakness`);
            break;

        case ILNESS.MEDULAR_APOCALYPSE:
            const newConstitution = Math.floor(attributes.constitution - (attributes.constitution * 0.3));
            updatePlayer = await PlayerService.updateOnePlayer(playerId, { medularApocalypse: true , 'modifiedAttributes.constitution' : newConstitution});
            console.log(`player with the id ${playerId} has infected with Medular Apocalypse`);
            break;
    }
}


module.exports = modifyAttributtesAcolytes; 