const express = require('express');
const path = require('path');
const app = require('./app'); // Importe l'instance 'app' configurée dans backend/app.js

const port = 5000; // Le port sur lequel Node.js va écouter

// MIDDLEWARE POUR SERVIR LES FICHIERS STATIQUES (TRÈS IMPORTANT : PLACER EN PREMIER !)
// Ces chemins doivent correspondre aux chemins demandés par le navigateur (et proxifiés par Apache)
// et sont relatifs à la position de CE FICHIER server.js (qui est dans backend/)
// Les fichiers statiques (CSS, JS, images, icones, HTML fragments) sont dans le dossier 'frontend'.
// Assurez-vous que ces chemins correspondent bien à la structure réelle de VOS FICHIERS.
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use('/images', express.static(path.join(__dirname, '../frontend/images'))); // Pour les images comme Pxx.JPG
app.use('/icones', express.static(path.join(__dirname, '../frontend/icones'))); // Pour les icônes du menu
app.use('/html', express.static(path.join(__dirname, '../frontend/html'))); // Pour les fragments HTML inclus (ex: header, footer)

// Configuration des vues EJS
// Les vues .ejs (comme index_kanji.ejs, index_vocab.ejs) sont dans backend/IHM
app.set('views', path.join(__dirname, 'IHM')); 
app.set('view engine', 'ejs');

// Routes Express pour les pages EJS
// Ces routes sont gérées par server.js et rendront les vues EJS
app.get('/kanji', (req, res) => {
    res.render('index_kanji'); // Rendre la vue EJS depuis backend/IHM
});

app.get('/vocab', (req, res) => {
    res.render('index_vocab'); // Rendre la vue EJS depuis backend/IHM (assurez-vous d'avoir ce fichier)
});

// La route pour /departement est intentionnellement omise ici pour correspondre à votre demande.
// app.get('/departement', (req, res) => {
//     res.render('index_departement');
// });

// Route pour la page d'accueil principale
// Si votre index.html principal est dans 'frontend/html/', il est servi par app.use('/html', ...)
// et Apache proxifie la racine '/' vers Node.js qui va chercher '/html/index.html'.
// Donc, cette route '/' n'est peut-être pas nécessaire ici si l'index.html est servi via express.static.
// Si vous voulez une route explicite pour la racine qui envoie un fichier, ce serait :
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});
*/
// Si vous avez un fichier index.html à la racine de 'frontend/', ce serait :
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
*/


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur Node.js démarré sur http://localhost:${port}`);
});
