// Import express et router 
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));

router.use(express.static('public'));
router.use(express.static('css'));

const path = require('path');
console.log(__dirname);
// Import de la connexion mysql 
const db = require("../db/db");

router
//.use(express.static('./funigo3nodejs/IHM'))
.get('/api/rechercheVocab', (req, res, next) => { 
    res.render(path.join(__dirname + "./../IHM/rechercheVocab.ejs"));
});


router.post('/api/rechercheVocab', function(req, res, next) {
    
    let voca_index = req.body.voca_index
    let niveau = req.body.Niveau
    let kana = req.body.kana
    let kanji = req.body.kanji 
    let traduction = req.body.traduction

    let reqSql =  "select * from voca_char where";
    
    if(voca_index !== ""){
        reqSql = `${reqSql}` + " voca_index = " + `${voca_index}`  + "'"
        console.log(reqSql);
    }

    if(niveau != ""){
        reqSql = `${reqSql}` + " niveau = '" + `${niveau}` + "'" 
        console.log(reqSql);
    }else{
        reqSql = `${reqSql}` + " niveau like 'N%'" 
    }

    if(kana != ""){
        reqSql = `${reqSql}` + " and kana like '%" + `${kana}` + "%'" 
        console.log(reqSql);
    }


    if(kanji != ""){
        reqSql = `${reqSql}` + " and kanji like '%" + `${kanji}` + "%'" 
        console.log(reqSql);
    }


    if(traduction != ""){
        reqSql = `${reqSql}` + " and francais like '%" + `${traduction}` + "%'" 
        console.log(reqSql);
    }
 
    console.log(reqSql);
    let reqSqlb = reqSql.replace('*', 'count(voca_index) AS namesCount');
    console.log(reqSqlb);

    db.query( reqSql, function (err, result) {
        if (err) {
        console.log(err);
        }else{

        // { result } est un tableau contenant les données récupérées par la requête envoyé à la partie cliente
        // affichageRechercheVocab => fichier affichageRechercheVocab.ejs
        res.status(200).render('affichageRechercheVocab.ejs', { result }); // pour ejs
        }
    });
   

});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;