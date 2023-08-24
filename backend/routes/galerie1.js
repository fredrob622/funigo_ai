// Import express et router 
const { log, Console } = require("console");
const express = require("express");
const router = express.Router();

// import du module fs file system pour lire répertoire 
const fs = require('fs');

router.use(express.static('public'));
router.use(express.static('css'));

router.get( '/api/galerie1', (req,res) => {
    if (req) {

        const dirSrc = "./public/galerie1"; // definition du répertoire
        console.log(files);
        var files = fs.readdirSync(dirSrc);
        res.render('affGalerie1', { files });
    }
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;