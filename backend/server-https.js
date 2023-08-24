// importer module https
const https = require('https');
// importer module fs
const fs = require('fs');
// importer l'application app.js
const app = require("./app");


// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
// La méthode config charge les variables dans le fichier process.env.
const result = dotenv.config();

const express = require('express');

// // configurer le port avec la methode set de express. Attribut la valeur process.env.PORT (3000) à port
// app.set("port", process.env.PORT);

// //  URL http://localhost:5000/ renvoie   "Hello world"
// app.get('/', (req, res) => {
//   res.send(`Hello World! vous êtes sur localhost et le port ${process.env.PORT} => URL http://localhost:5000/ !`)
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Express Application exemple à l'écoute sur le port ${process.env.PORT}!`)
// });

var options = {
  key: fs.readFileSync('../cert-funigo/funigofr/privkey.pem'),
  cert: fs.readFileSync('../cert-funigo/funigofr/cert.pem')
};

https.createServer(options, function(req,res) {
  res.writeHead(200);
  res.end("site https funigo.fr sur le port 5000");
}).listen(5000);


