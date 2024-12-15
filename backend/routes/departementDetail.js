// Import express et router 
const { log } = require("console");
const express = require("express");
const router = express.Router();

// import du module fs file system
const fs = require('fs');

router.use(express.static('public'));


router.get( '/api/departementDet', (req,res) => {
    if (req) {

        const dirSrc = "./public"; // definition du répertoire

        const tab_agl = fs.readdirSync(`${dirSrc}` + "/dep_aglomeration");
        const tab_dep = fs.readdirSync(`${dirSrc}` + "/dep_carte");
        const tab_reg = fs.readdirSync(`${dirSrc}` + "/dep_region");
        const tab_pos = fs.readdirSync(`${dirSrc}` + "/dep_position");

        console.log(tab_agl[63-1], tab_dep[63-1], tab_pos[63-1]);

        for (i=0; i < tab_pos.length; i++){
            temp = tab_pos[i];
            const searchTerm = '-Position.svg.png';
            
            // init du tableau 
            let tab_pos_bis = [];
            // on enlève après le dernier tiret
            tab_pos_bis[i] = tab_pos[i].substring(0, tab_pos[i].lastIndexOf(searchTerm));
            tab_pos_bis[i] = tab_pos_bis[i].toLowerCase() + ".png"
            console.log(tab_pos_bis[i]);

            console.log(`${dirSrc}` + "/dep_position" + `${tab_pos[i]}`);
            console.log(`${dirSrc}` + "/dep_position" + `${tab_pos_bis[i]}`);

            // Rename the file
            fs.rename(`${dirSrc}` + "/dep_position/" + `${tab_pos[i]}`, 
                      `${dirSrc}` + "/dep_position/" + `${tab_pos_bis[i]}`, 
                       () => { console.log("\nFile Renamed!\n");
            });
        }};
     });

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;
