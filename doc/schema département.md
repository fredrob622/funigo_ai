*******************************************
frondend								  *
*******************************************
schema de département
=====================

index_sas.html => menu acceuil -> onglet France puis Département
--------------							|
										|
										v		
                     <div class="nav__link">
                        <img src="./icones/france3.jpg" alt=france">
                        <span class="nav-span">France フランス</span>
                     </div>

                     <ul class="dropdown__menu">
                        <li> 
                           <div class="dropdown__link">
                              <img src="./icones/departement_fr.gif" alt="Département">
                              <a href="./index_departement.html" target="_self">Département      </a>       
                           </div>               
                        </li>
									    |
										|
										v	
	./index_departement.html ---> appel l'api http://localhost:5000/api/rechercheDep sur le backend
	------------------------
	
*******************************************
backend								      *
*******************************************


fichier server.js 
-----------------
			|
			v			
	
	const dotenv = require("dotenv");	// Importer le package pour utiliser les variables d'environnement
	const express = require('express'); // Importer express pour créer un server web
				|
				v	
				fichier .env
				------------
						|
						v	
						  
						PORT = 5000 // pas de ; après les définition

						// Connexion à la base
						DB_HOST     =   "192.168.99.113"
						DB_USER     =   "japadmin"
						DB_PASSWORD =   "jap_2010"
						DB_DATABASE =   "jap"
	const app = require("./app"); 		// importer l'application app.js
				|
				V
		 **** Dans app.js ajout du middleware
			  
			#// import des routes 
			const rechercheDep     = require("./routes/rechercheDepartement");
			#// Définition des routes 
			app.use(rechercheDep);
					|
					V			         
			#// configuration du middleware
			//  A l'aide des fonctions app.use on lie le middleware au niveau de l'application à une instance de 
			l' objet app .app.use(rechercheVocab);
				    |
					v			
				En Node.js, **un middleware** est une fonction qui a accès à l'objet de requête (req), à l'objet de réponse 
				(res) et à la prochaine fonction middleware dans le cycle de requête-réponse de l'application. Ces 
				fonctions peuvent exécuter du code, apporter des modifications aux objets de requête et de réponse, 
				terminer le cycle de requête-réponse ou appeler le prochain middleware dans la pile.
				    |
					v
			Le middleware s'appelle http://localhost:5000/api/rechercheDep
				    |
					v
				La **route** fait partie du système de routage. Une route spécifie un chemin d'URL dans votre 
				application et une méthode HTTP (GET, POST, PUT, DELETE, etc.). Chaque route est associée à 
				une ou plusieurs fonctions qui seront exécutées lorsque la route correspond à une requête 
				entrante.
					|
					v
			*** Dans la route backend/routes/rechercheDepartement.js		
						|
						v
					// Import express et router 
					const express = require("express");
					const router = express.Router();
					const db = require("../db/db"); 	--> connexion à la base mysql 
					const bodyParser = require('body-parser');	
								|
								v
							**body-parser** est un middleware pour Node.js qui permet de parser le corps 
							des requêtes entrantes dans un middleware avant qu'elles n'atteignent 
							les gestionnaires de requêtes, c'est-à-dire avant que les routes et 
							les méthodes ne soient traitées.
									|
									v							
							router.use(bodyParser.urlencoded({ extended: false}));
									|
									v								
							body-parser peut convertir les données JSON contenues dans le corps de la requête 
							en objets JavaScript accessibles via req.body
							
							Il parse les données de formulaire qui utilisent l'encodage URL (le type de contenu 
							application/x-www-form-urlencoded). Cela est courant avec les formulaires HTML.
									|
									v								
							router.use(express.static('public'));
							router.use(express.static('css'));
							router.use(express.static('js'));
							router.use(express.static('carte'));
									|
									v													
							**express.static** est une fonction middleware intégrée qui sert à livrer des fichiers 
							statiques tels que des images, des fichiers CSS, des fichiers JavaScript, etc. 
							Ce middleware rend les fichiers se trouvant dans le répertoire spécifié accessibles via 
							le web.
							
							**express.static** est utilisé pour servir des fichiers statiques à partir du répertoire 
							public. path.join(__dirname, 'public') est utilisé pour construire le chemin absolu 
							vers le répertoire public.
							
							Répertoire de D:\funigo\backend\public
							              ------------------------
									|
									v	
								18/05/2024  13:00    <DIR>          cartes
								18/05/2024  13:00    <DIR>          dep_aglomeration
								18/05/2024  13:00    <DIR>          dep_carte
								14/12/2024  20:59    <DIR>          dep_position
								18/05/2024  13:00    <DIR>          dep_region
								18/05/2024  13:00    <DIR>          dom
								18/05/2024  13:00    <DIR>          galerie1
								18/05/2024  13:00    <DIR>          galerie2
								18/05/2024  13:00    <DIR>          icones
								18/05/2024  13:00    <DIR>          images
								18/05/2024  13:00    <DIR>          js
									|
									v									
							router.get('/api/rechercheDep', (req, res, next) => { 
							   res.render(path.join(__dirname + "./../IHM/departementRech.ejs"));
							});
							
							Ce code définit une route GET à l'URL /api/rechercheDep. Lorsque cette URL est 
							demandée, le serveur rend et envoie le fichier **departementRech.ejs**  situé dans 
							le répertoire IHM. 
									|
									v	
							*** Dans le fichier departementRech.ejs situé dans le répertoire IHM. 
							
							appel deux fichiers backend/css
									<link rel="stylesheet" href="/general.css">
									<link rel="stylesheet" href="/departement.css">
									
									<script type="text/javascript" src="/fonction.js"></script>
											|
											v	
										contient la fonction fonctStorageInputDep( valeur dep reg et pref)
										
								<body onload="fonctStorageInputDep()" -> on charge les valeurs dep reg pref

							créer le formulaire de recherche avec 4 entrées
							
								<label for="num_dep">&emsp;N°</label>
								<label for="nom_dep">&emsp;&emsp;&emsp;&emsp;&emsp;Nom du Département</label>
								<label for="nom_reg">&emsp;&emsp;&emsp;&emsp;&emsp;Nom De la Région</label>
								<label for="nom_pref">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Nom de la Préfecture</label>

							lorsque l'on clique sur le bouton 
							<button type="submit" >lancer la recherche</button>
							
							on lance API rechercheDep <form action="/api/rechercheDep" method="post">
									|
									v							   
							Retour ./../IHM/departementRech.ejs" avec la méthode post
									|
									v								
							router.post('/api/rechercheDep', function(req, res, next) {
							
							router.post : Cela définit une route HTTP POST sur l'objet router.
							'/api/rechercheDep' : C'est le chemin de la route. Lorsque le serveur reçoit 
							une requête POST à ce chemin, la fonction callback sera exécutée. 
							function(req, res, next) : C'est la fonction de rappel (callback) qui sera exécutée 
							lorsque cette route sera appelée. Elle prend trois arguments :
								req : L'objet de requête. Il contient des informations sur la requête HTTP, 
								y compris les données envoyées dans le corps de la requête.
								res : L'objet de réponse. Il est utilisé pour envoyer une réponse au client.
								next : Une fonction qui, lorsqu'elle est appelée, passe le contrôle au middleware suivant dans la chaîne.
									|
									v		
							on récupère les données de la requette envoyé par le formulaire
							
							let num_dep  = req.body.num_dep
							let nom_dep  = req.body.nom_dep 
							let nom_reg  = req.body.nom_reg
							let nom_pref = req.body.nom_pref

							on construit la requette SQL
									|
									v								
							db.query( reqSql, function (err, result) {
								if (err) {
									console.log(err);
								}else{							  
									// { result } est un tableau contenant les données récupérées par la requête 
									// envoyé à la partie cliente
									//  departementAff => fichier departementAff.ejs
									res.status(200).render('departementAff', { result }); // pour ejs								
								}
							});
									|
									v								
							res.status(200).render('departementAff', { result }); // pour ejs							

							result : Contient les données récupérées par la requête SQL, typiquement sous forme 
							de tableau d'objets.
							
							res.status(200) : Définit le statut HTTP de la réponse à 200, ce qui signifie "OK".
							
							render('departementAff', { result }) : Utilise la méthode render pour rendre la vue 
							departementAff (un fichier EJS) en y injectant les résultats de la requête SQL.
							
							'departementAff' : Nom du fichier de template EJS (sans l'extension .ejs).
							
							{ result } : Un objet contenant les données à passer à la vue. Dans ce cas, result est 
							passé comme variable à la vue EJS.
									|
									v								
							*** Dans le fichier IHM/departementAff.ejs 
							
							<link rel="stylesheet" href="/general.css">
							<link rel="stylesheet" href="/departement.css">
							<script type="text/javascript" src="/fonction.js"></script>
							
							On se sert du contenu de result ( resultat de la requête) pour créer le tableau
							
							<div class="affichage_resultat"  >  
			
							<h2>Liste du ou des départements </h2>
							<table >
								<caption>Résultat de la recherche 	</caption>
								<tr>
									<th>nb</th>
									<th>Département</th>
									<th>Région</th>
									<th>Superficie en km/</th>
									<th>Population</th>
									<th>Densité</th>
									<th>Préfecture</th>
									<th>Population</th>
									<th>Sous-Préfecture</th>
								</tr>

								<!-- Boucle pour lire le tableau -->
								<% for(i=0; i<result.length; i++) { %>
									<tr>
										 <td width=1% align=left id="dep_numero"><%= result[i].num_dep%></td>
										 <td width=2% align=left id="dep_nom"><%= result[i].nom_dep%></td>
										 <td width=2% align=left id="dep_region"><%= result[i].nom_reg%></td>
										 <td width=1% align=left id="dep_superficie"><%= result[i].superficie%></td>
										 <td width=1% align=left id="dep_pop"><%= result[i].pop_dep%></td> 
										 <td width=1% align=left id="dep_densite"><%= result[i].densite%></td> 
										 <td width=1% align=left id="dep_prefecture"><%= result[i].nom_pref%></td> 
										 <td width=1% align=center id="dep_prefecturepop"><%= result[i].pop_pref%></td>
										 <td width=3% align=left id="dep_sousprefecture"><%= result[i].sousprefecture %></td> 						 			 
								  </tr>  
								<% } %>
							</table> 
							
							Avec le code <%- include('../IHM/departementAffCarte') %> à la fin du fichier on 
							appelle le fichier ejs backend/IHM/departementAffCarte.ejs									
									|
									v	
							*** Dans le fichier  backend/IHM/departementAffCarte.ejs
							
							
							
							

			
			    
