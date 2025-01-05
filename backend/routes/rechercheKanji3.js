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
.get('/api/rechercheKanji3', (req, res, next) => { 
    res.render(path.join(__dirname + "./../IHM/rechercheKanji3.ejs"));
});


router.post('/api/rechercheKanji3', function(req, res, next) {
    
    let kanjiindex = req.body.kanjiindex
    let niveau = req.body.Niveau
    let kanji = req.body.kanji 
    let onyomi = req.body.onyomi
    let kunyomi = req.body.kunyomi
    let traduction = req.body.traduction

    let reqSql =  "select * from kanji_char where";
    
    if(kanjiindex !== ""){
        reqSql = `${reqSql}` + " kanji_index = " + `${kanjiindex}`  
        console.log(reqSql);
    }

    if(niveau != ""){
        reqSql = `${reqSql}` + " niveau = '" + `${niveau}` + "'" 
        console.log(reqSql);
    }else{
        reqSql = `${reqSql}` + " niveau like 'N%'" 
    }


    if(kanji != ""){
        reqSql = `${reqSql}` + " and kanji like '%" + `${kanji}` + "%'" 
        console.log(reqSql);
    }

    if(onyomi != ""){
        reqSql = `${reqSql}` + " and onyomi like '%" + `${onyomi}` + "%'" 
        console.log(reqSql);
    }
 
    if(kunyomi != ""){
        reqSql = `${reqSql}` + " and kunyomi like '%" + `${kunyomi}` + "%'" 
        console.log(reqSql);
    }

    if(traduction != ""){
        reqSql = `${reqSql}` + " and francais like '%" + `${traduction}` + "%'" 
        console.log(reqSql);
    }
 
    console.log(reqSql);
    let reqSqlb = reqSql.replace('*', 'count(kanji_index) AS namesCount');
    console.log(reqSqlb);

    db.query( reqSql, function (err, result) {
        if (err) {
        console.log(err);
        }else{

        // { result } est un tableau contenant les données récupérées par la requête envoyé à la partie cliente
        // affichageRechercheKanji => fichier affichageRechercheKanji.ejs
        res.status(200).render('affichageRechercheKanji', { result }); // pour ejs
        }
    });
   

});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;