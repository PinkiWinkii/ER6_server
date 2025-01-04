const { sendPushNotification } = require('../notifications/notificationSender');
const playerService = require('../services/playerService');

const mortimerCallingHandler = (socket) => {

    socket.on("CallMortimerAngelo", async () => {
        console.log("MESSAGE RECEIVED FROM CALLING MORTIMER BUTTON");
        console.log(msg);
    
        // Send notification
        const mortimer = await playerService.getPlayerByEmail("oskar.calvo@aeg.eus");
        const fcmToken = mortimer.fcmToken;
        let title = "Urgent: Your presence is needed immediately!";
        let body = "An emergency of great magnitude is unfolding. You must come, destiny calls. Time is of the essence!";
        await sendPushNotification(fcmToken, title, body);
    })
}

module.exports = {
    mortimerCallingHandler,
}