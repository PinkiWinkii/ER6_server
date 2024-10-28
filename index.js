require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const cors  = require('cors'); 
const bodyParser = require('body-parser');
const mongoose      = require('mongoose');
const mongodbRoute  = process.env.MONGO_DB_STRING;
const { createServer } = require("http");
const { Server } = require("socket.io");
const { IP }     = require('./constants');
const mqtt = require('mqtt');
const fs = require('fs');
// Inicializar Firebase Admin SDK
const serviceAccount = require('./er6client-f6c7f-firebase-adminsdk-a28zc-a0fdc84a0a.json');
const playerRouter   = require('./src/routes/playerRoutes');
const { initSocket, getSocket } = require('./src/socket');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const server = createServer(app);

// // Load the certificates
// const options = {
//   key: fs.readFileSync('/home/labaka/Lander_DAW2/ER6/Certificates/NODE/node.key'),
//   cert: fs.readFileSync('/home/labaka/Lander_DAW2/ER6/Certificates/NODE/node.crt'),
//   ca: fs.readFileSync('/home/labaka/Lander_DAW2/ER6/Certificates/ca.crt'),
//   rejectUnauthorized: true,
//   clientId: 'LANDER_NODE'
// }
const client = mqtt.connect('mqtt://10.80.128.11:1883');

const topic = 'testEsp32'

client.on('connect', () => {
  console.log('Connected not securely to MQTT broker');
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
})

// Manejar mensajes recibidos
client.on('message', (topic, message) => {
  console.log(`Mensaje recibido en topic '${topic}': ${message.toString()}`);
});

// Manejar errores de conexión
client.on('error', (err) => {
  console.error('Error de conexión:', err);
  // Puedes agregar más acciones aquí, como reintentos o lógica adicional
});

initSocket(server);
const io = getSocket();
//Listener para saber si alguien se ha conectado, y su conexiónId
io.on('connection', (socket) => {
  console.log("User Socket ID:", socket.id);

    // QR value receiving
    socket.on('qrScanned', (qrValue) => {
      // Primero parseamos el valor QR recibido
      const parsedQrValue = JSON.parse(qrValue);
      console.log("QR Value received:", parsedQrValue);
      
      // Ahora sí podemos acceder a socketId de parsedQrValue
      console.log("SOCKET ID OF THE SCANNED ACOLYTE: " + parsedQrValue.socketId);
      
      // Emitir el evento usando el socketId del objeto parseado
      socket.to(parsedQrValue.socketId).emit('ScanSuccess', "OK!");
      
      // Emitir OK message después de recibir el valor QR
      socket.emit('ScanSuccess', "OK!");;

      io.emit('value', socket.id);
  });
})


// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use("/api/players", playerRouter);

// Ruta para verificar el token
app.post('/verify-token', async (req, res) => {
  const { idToken } = req.body;
  //console.log("Token recibido:" + idToken);
  
  if (!idToken) {
    return res.status(400).json({ error: 'No se proporcionó el idToken' });
  }

  try {
    // Verificar el idToken con Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log('Token verificado. UID del usuario:', uid);
    
    res.json({ success: true, uid: uid, decodedToken });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;

async function start(){
  try{
    await mongoose.connect(mongodbRoute);
    server.listen(PORT, () => {
      console.log(`Servidor levantado en el puerto ${PORT}`);
    });
    console.log("Conexion con mongo correcta");
  } catch (error){

    console.log(`Error al conectar a la base de datos ${error}`);
  }
}

start();