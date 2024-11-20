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

module.exports = {
  sendPushNotification
};