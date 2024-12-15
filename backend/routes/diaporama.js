// Import express et router 
const { log } = require("console");
const express = require("express");
const router = express.Router();

// import du module fs file system
const fs = require('fs');

// Import de imagemagick
const img = require('imagemagick');

router.use(express.static('public'));

router.get( '/api/diaporama', (req,res) => {
    if (req) {
      
    const dirSrc = "./images"; // definition du répertoire
    const dirDest = "./public/images"; // definition du répertoire

    // La méthode fs.readdirSync() est utilisée pour lire de manière synchrone le 
    // contenu d'un répertoire donné. La méthode renvoie un tableau avec tous les
    // noms de fichiers ou objets du répertoire.
    var files = fs.readdirSync(dirSrc);

    for (const file of files){

        // calcul de la longueur de file - .jpg
        fileLength = file.length;
        fileOffset = fileLength - 4;
        // récupération de l'extention
        fileExt = file.substring(fileOffset , fileLength);
        // console.log(fileExt);
        // On remplace  .JPG par b.JPG 
        const fileDest = file.replace(fileExt, 'b.JPG');

        const srcFile = `${dirSrc}` + "/" + `${file}`;
        const destFile = `${dirDest}` + "/" + `${fileDest}`;
        // console.log(srcFile, destFile);

        // imagemagick retaille image
        img.resize({
          srcPath: `${srcFile}`,
          dstPath: `${destFile}`,
          width:   1280,
          height: 720,
        }, function (err, stdout, stderr) {
            if (err) {
                console.log(err); 
            }
          console.log("resized :", srcFile, "en", destFile );
          
        });

    };
      var files = fs.readdirSync(dirDest);
      //console.log(files[0]);
      res.render('affPhoto', { files });
    }
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;
