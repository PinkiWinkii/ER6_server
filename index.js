const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); 
const bodyParser = require('body-parser');

// Inicializar Firebase Admin SDK
const serviceAccount = require('./er6client-f6c7f-firebase-adminsdk-a28zc-a0fdc84a0a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

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
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});