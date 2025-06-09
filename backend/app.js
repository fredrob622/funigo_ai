// backend/app.js

// Importation des modules nécessaires
const express = require("express");
const cors = require('cors'); // Pour gérer les requêtes Cross-Origin Resource Sharing
const app = express(); // Création de l'instance de l'application Express

// Importation des routeurs (assurez-vous que les chemins sont corrects par rapport à app.js)
const rechercheKanjiRouter = require("./routes/rechercheKanji");
const rechercheVocabRouter = require("./routes/rechercheVocab");
const rechercheDepRouter = require("./routes/rechercheDepartement");
const rechercheRegRouter = require("./routes/rechercheRegion");
const quizRouter = require("./routes/quiz");

// Importation des routeurs pour les photos
const diaporamaRouter = require("./routes/diaporama");
const diaporama2Router = require("./routes/diaporama2");
const affPhotoSharpRouter = require("./routes/affPhotoSharp");
const galerie1Router = require("./routes/galerie1");
const galerie2Router = require("./routes/galerie2");


// Configuration du middleware CORS
// Ceci doit être placé AVANT toute définition de route pour s'assurer qu'il s'applique à toutes les requêtes.
const allowedOrigins = [
  'http://127.0.0.1:5501', // Pour le développement local (par exemple, Live Server)
  'https://funigo.fr',    // Votre domaine de production (sans www)
  'https://www.funigo.fr' // Votre domaine de production (avec www)
];

app.use(cors({
  origin: function (origin, callback) {
    // Permet les requêtes sans origine (comme celles de Postman, curl, ou fichiers locaux directs)
    if (!origin) return callback(null, true);
    // Vérifie si l'origine de la requête est dans la liste des origines autorisées
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `La politique CORS de ce site n'autorise pas l'accès depuis l'origine spécifiée : ${origin}.`;
      return callback(new Error(msg), false);
    }
    // Si l'origine est autorisée, passez la requête
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  credentials: true // Important : si cette option est à true, l'en-tête 'Access-Control-Allow-Origin'
                    // ne peut PAS être '*' (astérisque) et doit être une origine spécifique.
                    // Elle est nécessaire si vous envoyez des cookies ou des en-têtes d'autorisation
                    // (comme un token JWT dans un header 'Authorization') avec la requête cross-origin.
}));

// MIDDLEWARES DE PARSING DU CORPS DE REQUÊTE (CRUCIAL POUR POST)
// Assurez-vous que ces lignes sont bien présentes et avant les routeurs
app.use(express.json()); // Pour parser les requêtes au format JSON
app.use(express.urlencoded({ extended: false })); // Pour parser les requêtes au format URL-encoded (formulaires HTML)

app.use((req, res, next) => {
  console.log(`[APP] Requête reçue: ${req.method} ${req.url}`);
  console.log('[APP] Corps de la requête (avant routeurs) :', req.body);
  next();
});

// Enregistrement des routeurs sur l'instance 'app'
// Toutes les requêtes seront maintenant traitées par ces routeurs.
// Si vous voulez que vos routeurs soient montés sous /api/
// et que vos fichiers routeurs comme rechercheKanji.js définissent des routes comme '/'
// alors dans app.js :
app.use('/api', rechercheKanjiRouter);
app.use('/api', rechercheVocabRouter);
app.use('/api', rechercheDepRouter);
app.use('/api', rechercheRegRouter);
app.use('/api', quizRouter);

app.use(diaporamaRouter);
app.use(diaporama2Router);
app.use(affPhotoSharpRouter);
app.use(galerie1Router);
app.use(galerie2Router);

// Exportation de l'instance 'app' configurée pour être utilisée par server.js
module.exports = app;
