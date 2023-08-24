// import module
const mysql = require('mysql');

// Import les routes fichiers routes/****.js 
const rechercheKanji2  = require("./routes/rechercheKanji2");
const rechercheVocab   = require("./routes/rechercheVocab");
const rechercheDep     = require("./routes/rechercheDepartement");
const departementDet   = require("./routes/departementDetail");

//const creationRepThumb = require("./routes/creationRepThumb");
//const visuRepthumb = require("./routes/visuRepthumb");
// const kanjiN5         = require("./routes/kanjiN5");
// const choisirKanjiNiv = require("./archive/choisirKanjiNiv");
// const rechercheKanji3  = require("./archive/rechercheKanji3");

// import des routes pour les photos
const galerie1      = require("./routes/galerie1");
const galerie2      = require("./routes/galerie2");
// const diaporama     = require("./routes/diaporama");
// const diaporama2    = require("./routes/diaporama2");
// const affPhotoSharp = require("./routes/affPhotoSharp");

// import du module express pour utiliser les méthodes
const { clear } = require("console");
const express = require("express");
const ejs = require('ejs');

// creation d'une instance express serveur web et la place dans la variable APP
const app = express();

// Définition du moteur d'affichage
app.set('view engine', 'ejs');
// views, le répertoire dans lequel se trouvent les fichiers modèles. 
// répertoire où sont les fichiers ejs
app.set('views', 'IHM');


// Définition des routes 

app.use(rechercheKanji2);
app.use(rechercheVocab);
app.use(rechercheDep);
app.use(departementDet);
// app.use(kanjiN5);
// app.use(choisirKanjiNiv);
// app.use(rechercheKanji3);

// Définition des routes 

app.use(galerie1);
app.use(galerie2);
//app.use(creationRepThumb);
//app.use(visuRepthumb);
// app.use(affPhotoSharp);
// app.use(diaporama);
// app.use(diaporama2);

// export de app.js pour pouvoir être accèder à partir d'un autre fichier
module.exports = app;


