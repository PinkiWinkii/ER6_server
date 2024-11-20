const { sendPushNotification } = require('../notifications/notificationSender');
const playerService = require('../services/playerService');

const mortimerCallingHandler = (socket) => {

    socket.on("CallMortimer", async (msg) => {
        console.log("MESSAGE RECEIVED FROM CALLING MORTIMER BUTTON");
        console.log(msg);

        //Send notification
        const mortimer = await playerService.getPlayerByEmail("oskar.calvo@aeg.eus");
        const fcmToken = mortimer.fcmToken;
        let title = "The acolytes call you, destiny awaits.";
        let body = "The artifacts await, their power is bounded until validated.";
        await sendPushNotification(fcmToken, title, body);
    })
}

module.exports = {
    mortimerCallingHandler,
}