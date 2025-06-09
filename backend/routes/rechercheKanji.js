// backend/routes/rechercheKanji.js

// Importation des modules nécessaires
const express = require("express");
const router = express.Router(); // IMPORTANT : Utilisez 'router' ici, pas 'app'
const bodyParser = require('body-parser');
const path = require('path'); // Utile pour les chemins de fichiers si nécessaire
const db = require("../db/db"); // Import de la connexion MySQL (assurez-vous du chemin correct)

// Middleware pour parser les corps de requêtes URL-encoded (pour les formulaires HTML)
router.use(bodyParser.urlencoded({ extended: false }));

// Route GET pour le formulaire ou l'affichage initial
router.get('/recherche-kanji-formulaire', (req, res) => {
    res.render(path.join(__dirname, "./../IHM/rechercheKanji.ejs"));
});



// Route GET pour l'API de recherche (si vous voulez la séparer du POST)
// Si l'objectif est de récupérer tous les kanji sans filtre, ce serait router.get('/')
router.get('/rechercheKanji', (req, res, next) => { // <-- Ici, `/rechercheKanji`
    let reqSql = "SELECT * FROM kanji_char";
    db.query(reqSql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des kanji pour l'API :", err);
            res.status(500).json({ error: "Erreur lors de la récupération des données kanji." });
        } else {
            // Si c'est une API GET, retournez JSON. Ne faites pas de res.render ici.
            res.status(200).json(result); // Pour les requêtes API (GET)
        }
    });
    // ATTENTION : Ne laissez pas de res.render() ou res.json() ici en dehors du callback db.query.
    // Vous avez un problème dans votre code actuel où vous tentez de faire un res.render après le db.query.
    // Une seule réponse par requête.
});
    


// Route POST pour l'API de recherche de Kanji
// Cette route traite les requêtes de recherche avec des critères envoyés dans le corps de la requête.
router.post('/rechercheKanji', (req, res) => {
    console.log("[KANJI_ROUTE] Route POST /rechercheKanji atteinte.");
    console.log("[KANJI_ROUTE] Corps de la requête dans la route POST :", req.body);
    // Récupération des paramètres de recherche depuis le corps de la requête
    let kanjiindex = req.body.kanjiindex;
    let niveau = req.body.Niveau;
    let kanji = req.body.kanji;
    let onyomi = req.body.onyomi;
    let kunyomi = req.body.kunyomi;
    let traduction = req.body.traduction;

    // Construction de la requête SQL dynamique
    let reqSql = "SELECT * FROM kanji_char WHERE 1=1"; // 'WHERE 1=1' simplifie l'ajout de conditions 'AND'

    if (kanjiindex !== "") {
        reqSql += ` AND kanji_index = ${db.escape(kanjiindex)}`; // Utilisation de db.escape pour la sécurité SQL
    }
    if (niveau !== "") {
        reqSql += ` AND niveau = ${db.escape(niveau)}`;
    } else {
        reqSql += ` AND niveau LIKE '%'`; // Si aucun niveau n'est spécifié, inclure tous les niveaux
    }
    if (kanji !== "") {
        reqSql += ` AND kanji LIKE ${db.escape('%' + kanji + '%')}`;
    }
    if (onyomi !== "") {
        reqSql += ` AND onyomi LIKE ${db.escape('%' + onyomi + '%')}`;
    }
    if (kunyomi !== "") {
        reqSql += ` AND kunyomi LIKE ${db.escape('%' + kunyomi + '%')}`;
    }
    if (traduction !== "") {
        reqSql += ` AND francais LIKE ${db.escape('%' + traduction + '%')}`;
    }

    console.log("[KANJI_ROUTE] Requête SQL générée :", reqSql);

    db.query(reqSql, (err, result) => {
        if (err) {
            console.error("[KANJI_ROUTE] Erreur lors de la recherche POST de kanji :", err);
            res.status(500).json({ error: "Erreur lors de la recherche de kanji." });
        } else {
            console.log("[KANJI_ROUTE] Résultats de la requête SQL (nombre d'enregistrements) :", result.length);
            console.log("[KANJI_ROUTE] Premiers résultats (si existent) :", result.slice(0, 5));
            res.status(200).render('affichageRechercheKanji', { result });
        }
    });
});

// Rend accessible l'objet router aux autres fichiers (app.js)
module.exports = router;
