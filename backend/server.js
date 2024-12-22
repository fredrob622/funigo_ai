// importer l'application app.js
const app = require("./app");

// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
// La méthode config charge les variables dans le fichier process.env.
const result = dotenv.config();

const express = require('express');

// configurer le port avec la methode set de express. Attribut la valeur process.env.PORT (3000) à port
app.set("port", process.env.PORT);

//  URL http://localhost:5000/ renvoie   "Hello world"
app.get('/', (req, res) => {
  res.send(`Hello World! vous êtes sur localhost et le port ${process.env.PORT} => URL http://localhost:3000/ !`)
});

app.listen(process.env.PORT, () => {
  console.log(`Express Application exemple à l'écoute sur le port ${process.env.PORT}!`)
});


