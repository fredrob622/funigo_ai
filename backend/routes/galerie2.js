// Import express et router 
const { log } = require("console");
const express = require("express");
const router = express.Router();

// import du module fs file system
const fs = require('fs');

// Import de sharp
const sharp = require('sharp');

router.use(express.static('public'));
router.use(express.static('css'));

router.get( '/api/galerie2',(req,res) => {
  if (req) {

    function affich_gal() {
          const dirAff = "./public/galerie2"; 
          files=[];
          var files = fs.readdirSync(dirAff);
          
          res.render('affGalerie2', { files }); // fichier IHM 
        
      }
      const dirSrc = "./images"; // definition du répertoire
      const dirDest = "./public/galerie2"; // definition du répertoire

      // La méthode fs.readdirSync() est utilisée pour lire de manière synchrone le 
      // contenu d'un répertoire donné. La méthode renvoie un tableau avec tous les
      // noms de fichiers ou objets du répertoire.
      var files = fs.readdirSync(dirSrc);

      for (const file of files){

        const srcFile  = `${dirSrc}`  + "/" + `${file}`;
        const destFile = `${dirDest}` + "/" + `${file}`;
        // console.log(srcFile, destFile);

       async function resizeImage(affich_gal) {
          try {
            // await sharp(`${srcFile}`)
          await sharp(`${srcFile}`)
              .rotate()
              .resize({
                width: 300,
                //height: 720
              })
              .toFile(`${destFile}`);
              console.log(`${destFile}`);
              affich_gal();
          } catch (error) {
            console.log(`${srcFile}`);
            console.log(error);
          }finally{
            affich_gal();
          }
        }
        resizeImage(affich_gal);
      }
    }
  });


// Rend accessible l'objet router aux autres fichiers 
module.exports = router;
