// C:\Fichiers_Users\funigo\backend\server.js

// Importation des modules nécessaires
const app = require('./app'); // <<< Importe l'instance 'app' configurée depuis app.js
const express = require('express'); // Nécessaire pour express.static et path
const path = require('path');       // Nécessaire pour path.join

// --- Démarrage de la configuration Express qui dépend du chemin de base ---
// Configuration du moteur de vues EJS (important de le faire ici)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'IHM')); // Définit le dossier où Express trouvera tes fichiers EJS

// Middlewares pour servir les fichiers statiques (CSS, JS, images, etc.)
// Ces chemins doivent correspondre à la structure réelle de tes dossiers.
// Assure-toi que les chemins sont accessibles depuis la racine de ton site.
app.use(express.static(path.join(__dirname, 'public'))); // Si tu as un dossier 'public'
app.use('/css', express.static(path.join(__dirname, 'frontend/css'))); // Rend le contenu de frontend/css accessible via /css
app.use('/js', express.static(path.join(__dirname, 'frontend/js')));   // Rend le contenu de frontend/js accessible via /js
app.use('/images', express.static(path.join(__dirname, 'frontend/images'))); // Rend le contenu de frontend/images accessible via /images
app.use('/IHM', express.static(path.join(__dirname, 'backend/IHM')));

// Si vous avez des fichiers HTML/EJS comme header_menu.ejs ou footer_menu.ejs dans 'frontend'
// et que vous les incluez via EJS, ils doivent être dans le dossier 'views' (IHM ici).
// S'ils étaient des fichiers statiques purs dans 'frontend' et vous les fetchiez,
// la ligne suivante servirait ce dossier. Mais nous utilisons EJS pour l'inclusion maintenant.
// app.use(express.static(path.join(__dirname, 'frontend'))); // Cette ligne peut être problématique si elle sert des fichiers que EJS doit rendre. À revoir si problèmes.

// --- Définition des routes spécifiques au point d'entrée du serveur ---

// Route pour servir la page principale des Kanji (l'ancien index_kanji.html)
app.get('/kanji', (req, res) => {
    // Cela va rendre IHM/index_kanji.ejs
    res.render('index_kanji');
});

app.get('/vocab', (req, res) => {
    // Cela va rendre IHM/index_kanji.ejs
    res.render('index_vocab');
});

// Lance le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur HTTP en écoute sur le port ${PORT}`); // J'ai corrigé 'port' en 'PORT'
});