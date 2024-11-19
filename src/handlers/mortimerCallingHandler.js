const playerService = require('../services/playerService');
const { getMessaging } = require('firebase-admin/messaging');

const sendPushNotification = async (fcmToken, title, body) => {
    const message = {
    token: fcmToken,
    notification: {
        title: title,
        body: body,
    },
    android: {
        "direct_boot_ok": true,
    },
    };

    try {
    const response = await getMessaging().send(message);
    console.log("Notificación enviada:", response);
    } catch (error) {
    console.error("Error enviando notificación:", error);
    }
    };

const mortimerCallingHandler = (socket) => {

    socket.on("CallMortimer", async (msg) => {
        console.log("MESSAGE RECEIVED FROM CALLING MORTIMER BUTTON");
        console.log(msg);

        //Send notification
        const mortimer = await playerService.getPlayerByEmail("oskar.calvo@aeg.eus");
        const fcmToken = mortimer.fcmToken;
        let title = "The acolytes call you, destiny awaits.";
        let body = "The artifacts await, their power bound until validated.";
        await sendPushNotification(fcmToken, title, body);
    })
}

module.exports = {
    mortimerCallingHandler,
}