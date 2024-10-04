// socket.js
const { Server } = require("socket.io");

let io; // Declarar io sin inicializar

const initSocket = (serverInstance) => {
    io = new Server(serverInstance, {
        cors: {
            origin: '*', // Cambia esto según tus necesidades
            methods: ["GET", "POST"],
            transports: ['websocket']
        }
    });
};

const getSocket = () => {
    if (!io) {
        throw new Error("Socket.io not initialized. Call initSocket first.");
    }
    return io;
};

module.exports = {
    initSocket,
    getSocket,
};