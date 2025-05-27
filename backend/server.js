// importer l'application app.js
const https = require('https');
const app = require("./app");
const fs = require('fs');
const cors = require('cors');

// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
// La méthode config charge les variables dans le fichier process.env.
const result = dotenv.config();


const express = require('express');

const options = {
  key: fs.readFileSync('C:\\Certbot\\live\\funigo.fr\\privkey.pem'),
  cert: fs.readFileSync('C:\\Certbot\\live\\funigo.fr\\fullchain.pem'),
  ca: fs.readFileSync('C:\\Certbot\\live\\funigo.fr\\chain.pem')
  
};

app.use(cors({
  origin: 'https://funigo.fr',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  credentials: true // Si vous utilisez des cookies ou des sessions
}));

// app.use(cors());

// configurer le port avec la methode set de express. Attribut la valeur process.env.PORT (3000) à port
app.set("port", process.env.PORT);

//  URL http://localhost:5000/ renvoie   "Hello world"
app.get('/', (req, res) => {
  res.send(`Hello World! vous êtes sur localhost et le port ${process.env.PORT} => URL http://localhost:5000/ !`)
});

// app.listen(process.env.PORT, () => {
//   console.log(`Express Application exemple à l'écoute sur le port ${process.env.PORT}!`)
// });
// Créer le serveur HTTPS
https.createServer(options, app).listen(5000, () => {
  console.log('Serveur HTTPS en écoute sur le port 5000');
});

