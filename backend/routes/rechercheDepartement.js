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
router.get('/recherche-departement-formulaire', (req, res) => {
    res.render(path.join(__dirname, "./../IHM/rechercheDepartement.ejs"));
});


// Route GET pour l'API de recherche (si vous voulez la séparer du POST)
// Si l'objectif est de récupérer tous les departements sans filtre, ce serait router.get('/')
router.get('/rechercheDepartement', (req, res, next) => { // <-- Ici, `/rechercheKanji`
    let reqSql = "SELECT * FROM departement_fr";
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
router.post('/rechercheDepartement', (req, res) => {
    console.log("[KANJI_ROUTE] Route POST /rechercheKanji atteinte.");
    console.log("[KANJI_ROUTE] Corps de la requête dans la route POST :", req.body);
    // Récupération des paramètres de recherche depuis le corps de la requête

    let num_dep  = req.body.num_dep
    let nom_dep  = req.body.nom_dep 
    let nom_reg  = req.body.nom_reg
    let nom_pref = req.body.nom_pref

    let reqSql =  "select * from departement_fr where";
    
    if(num_dep !== ""){
        // reqSql = `${reqSql}` + " num_dep = " + `${num_dep}`  
        reqSql = `${reqSql}` + " num_dep like '%"  + `${num_dep}` + "%'"
        console.log(reqSql);
    }else{
        reqSql = `${reqSql}` + " num_dep like '%'" 
    }

    if(nom_dep != ""){
        reqSql = `${reqSql}` + " and nom_dep = '" + `${nom_dep}` + "'"
        console.log(reqSql);
    } else{
        reqSql = `${reqSql}` + " and nom_dep like '%'" 
    }

    if(nom_reg != ""){
        reqSql = `${reqSql}` + "  and nom_reg like '%" + `${nom_reg}` + "%'" 
        console.log(reqSql);
    }else{
        reqSql = `${reqSql}` + " and nom_reg like '%'" 
    }

    if(nom_pref != ""){
        reqSql = `${reqSql}` + " and nom_pref like '%" + `${nom_pref}` + "%'" 
        console.log(reqSql);
    }
 
    console.log(reqSql);
    let reqSqlb = reqSql.replace('*', 'count(dep_index) AS namesCount');
    console.log(reqSqlb);

    db.query( reqSql, function (err, result) {
        if (err) {
            console.log(err);
        }else{
          
            // { result } est un tableau contenant les données récupérées par la requête envoyé à la partie cliente
            //  departementAff => fichier departementAff.ejs
            res.status(200).render('affichageRechercheDepartement', { result }); // pour ejs
        }
    });
    
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;