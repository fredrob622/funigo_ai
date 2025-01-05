// import module
const mysql = require('mysql');

// Import les routes fichiers routes/****.js 
const rechercheKanji  = require("./routes/rechercheKanji");
const rechercheKanji3  = require("./routes/rechercheKanji3");
const rechercheVocab   = require("./routes/rechercheVocab");
const rechercheDep     = require("./routes/rechercheDepartement");
const rechercheReg   = require("./routes/rechercheRegion");
const quiz             = require("./routes/quiz");

// import des routes pour les photos
const diaporama     = require("./routes/diaporama");
const diaporama2    = require("./routes/diaporama2");
const affPhotoSharp = require("./routes/affPhotoSharp");
const galerie1      = require("./routes/galerie1");
const galerie2      = require("./routes/galerie2");

// import du module express pour utiliser les méthodes
const { clear } = require("console");
const express = require("express");
const ejs = require('ejs');
const { constants } = require('fs/promises');

// creation d'une instance express serveur web et la place dans la variable APP
const app = express();

// Définition du moteur d'affichage
app.set('view engine', 'ejs');
// views, le répertoire dans lequel se trouvent les fichiers modèles. 
// répertoire où sont les fichiers ejs
app.set('views', 'IHM');


// Définition des routes 
app.use(rechercheKanji);
app.use(rechercheKanji3);
app.use(rechercheVocab);
app.use(rechercheDep);
app.use(rechercheReg );
app.use(quiz);


// Définition des routes 
app.use(diaporama);
app.use(diaporama2);
app.use(galerie1);
app.use(galerie2);
app.use(affPhotoSharp);


// export de app.js pour pouvoir être accèder à partir d'un autre fichier
module.exports = app;


