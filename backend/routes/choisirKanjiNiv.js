// Import express et router 
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false}));

// Import de la connexion mysql 
const db = require("../db/db");
// const app = require("../app");

router.get('/api/choisirKanjiNiv', (req, res, next) => { 
    res.send(
        //+"<!DOCTYPE html>"
        +"<html>"
        +    "<body>" 
        +       "<form method='post'>"
        +           "Entrer le niveau des kanjis (de N5 à N1):"
        +           "<br/>"
        +           "<input type='text' name='Niv' value='Niveau' >"
        +           "<br/>"
        +           "<input type='submit' value='Confirmer' />"
        +       "</form>"
        +   "</body>" 
        +"</html>"
        
    )})
    
    router.post('/api/choisirKanjiNiv', function(req, res, next) {

        console.log(req.body.Niv);
        let Niveau = req.body.Niv
        console.log(Niveau);
        let reqSql =  "select * from kanji_char where niveau = '" + `${Niveau}` + "'"

        console.log(reqSql);
        db.query( reqSql, function (err, result) {
            if (err) {
            console.log(err);
            }else{
            //console.log(result); //res.json(result);
            // { result } => paramètre envoyé à la partie cliente
            // { result } qui est un tableau contenant les notes récupérées par la requête
            // kanjiN5 => fichier kanjiN5.ejs
            res.status(200).render('kanjiN5', { result }); // pour ejs
            }
            // La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON
            // const resultObjtoto = JSON.stringify(result);
            // console.log(resultObjtoto); //res.send(result);   //res.send(resultObjtoto);  //res.json(resultObjtoto);
        });
    });

    // Rend accessible l'objet router aux autres fichiers 
    module.exports = router;