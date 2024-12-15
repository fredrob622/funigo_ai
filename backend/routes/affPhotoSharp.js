// Import express et router 
const { log } = require("console");
const express = require("express");
const router = express.Router();

// import du module fs file system
const fs = require('fs');

// Import de sharp
const sharp = require('sharp');

router.use(express.static('public'));
router.use(express.static('public\images'));

router.get( '/api/affPhotoSharp', (req,res) => {
    if (req) {
        // Extraire les metadatas
        
        const dirSrc  = "./public/images/1"; // definition du répertoire
        const dirDest = "./public/images/2"; // definition du répertoire

        // La méthode fs.readdirSync() est utilisée pour lire de manière synchrone le 
        // contenu d'un répertoire donné. La méthode renvoie un tableau avec tous les
        // noms de fichiers ou objets du répertoire.
        var files = fs.readdirSync(dirSrc);

        for (const file of files){

            const srcFile = `${dirSrc}` + "/" + `${file}`;
            const destFile = `${dirDest}` + "/" + `${file}`;
            //console.log(srcFile, destFile);
      
              async function getMetadata() {
                try{
                    const metadata = await sharp(`${srcFile}`).metadata();
                    console.log(metadata.format, metadata.orientation);
                  }catch (error) {
                    console.log(`An error occurred during processing: ${error}`);
                  }
              }   
            getMetadata();   

            async function resizeImage() {
              try {
                await sharp(`${srcFile}`)
                  .rotate()
                  .resize({
                    width: 1280,
                    // height: 720
                  })
                  .toFile(`${destFile}`);
              } catch (error) {
                console.log(`${srcFile}`);
                console.log(error);
              }
            } 
            
            resizeImage();
          }
        }


      const dirDest = "./public/images/2";
      var files = fs.readdirSync(dirDest);
      console.log(files);
      res.render('affPhoto', { files });
  });

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;
