// Import express et router 
const express = require("express");
const router = express.Router();


// Import de la connexion mysql 
const db = require("../db/db");

router.get('/api/N5', (req, res) => { 
    
    db.query("select * from kanji_char where niveau = 'N5' ", function (err, result) {
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