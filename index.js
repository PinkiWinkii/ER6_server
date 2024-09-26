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
// Inicializar Firebase Admin SDK
const serviceAccount = require('./er6client-f6c7f-firebase-adminsdk-a28zc-a0fdc84a0a.json');
const playerRouter   = require('./src/routes/playerRoutes');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const server = createServer(app);

// Inicializar socket.io con el servidor de Express
const io = new Server(server, { 
  cors: {
    origin: 'https://er6-staging-server.onrender.com', // Configura CORS según sea necesario
    methods: ["GET", "POST"],
    transports: ['websocket']
  }
});

//Listener para saber si alguien se ha conectado, y su conexiónId
io.on('connection', (socket) => {
  console.log("User Socket ID:", socket.id);
})

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use("/api/players", playerRouter);

// Ruta para verificar el token
app.post('/verify-token', async (req, res) => {
  const { idToken } = req.body;
  console.log("Token recibido:" + idToken);
  
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
