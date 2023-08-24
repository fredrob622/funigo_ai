// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
require('dotenv').config();

// Import module mysql
const mysql = require('mysql');

const db = mysql.createConnection({
   host: `${process.env.DB_HOST}`,
   user: `${process.env.DB_USER}`,
   password: `${process.env.DB_PASSWORD}`,
   database: `${process.env.DB_DATABASE}`,
  
 });
 console.log(`${process.env.DB_DATABASE}`);

 db.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

module.exports = db;
