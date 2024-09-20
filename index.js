const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const User = require('./User'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = 3000;

app.use(bodyParser.json());

const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const mongoUri = 'PinkiWinki:1fe46a07b13A1c1_*@polymorphs.fuwvu.mongodb.net/?retryWrites=true&w=majority&appName=Polymorphs';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Ruta para autenticar el token
app.post('/api/authenticate', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ tokenID: token });

    if (user) {
      res.status(200).json({ message: 'Token validado', uid: decodedToken.uid });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

// Nueva ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No se encontraron usuarios' });
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
