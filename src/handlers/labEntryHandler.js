const labEntryHandler = (socket, io) => {

    // QR value receiving
    socket.on('qrScanned', (qrValue) => {
        // Primero parseamos el valor QR recibido
        const parsedQrValue = JSON.parse(qrValue);

        // Emitir el evento usando el socketId del objeto parseado
        socket.to(parsedQrValue.socketId).emit('ScanSuccess', "OK!");

        // Emitir OK message después de recibir el valor QR
        socket.emit('ScanSuccess', "OK!");;

        io.emit('value', socket.id);
    });
}

module.exports = {
    labEntryHandler
}