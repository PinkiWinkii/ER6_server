const mortimerCallingHandler = (socket) => {
    socket.on("CallMortimer", (msg) => {
        console.log("MESSAGE RECEIVED FROM CALLING MORTIMER BUTTON");
        console.log(msg);
    })
}

module.exports = {
    mortimerCallingHandler,
}