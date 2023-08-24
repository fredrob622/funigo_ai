function fonctStorageInputDep(){


    var num_dep = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20A","20B","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","971","972","973","974","976"];
    var nom_dep = ["Ain","Aisne","Allier","Alpes-de-Haute-Provence","Hautes-Alpes","Alpes-Maritimes","Ardeche","Ardennes","Ariege","Aube","Aude","Aveyron","Bouches-du-Rhone","Calvados","Cantal","Charente","Charente-Maritime","Cher","Correze","Corse-du-Sud","Haute-Corse","Cote-d'Or","Cotes-d'Armor","Creuse","Dordogne","Doubs","Drome","Eure","Eure-et-Loir","Finistere","Gard","Haute-Garonne","Gers","Gironde","Herault","Ille-et-Vilaine","Indre","Indre-et-Loire","Isere","Jura","Landes","Loir-et-Cher","Loire","Haute-Loire","Loire-Atlantique","Loiret","Lot","Lot-et-Garonne","Lozere","Maine-et-Loire","Manche","Marne","Haute-Marne","Mayenne","Meurthe-et-Moselle","Meuse","Morbihan","Moselle","Nièvre","Nord","Oise","Orne","Pas-de-Calais","Puy-de-Dome","Pyrenees-Atlantiques","Hautes-Pyrenees","Pyrenees-Orientales","Bas-Rhin","Haut-Rhin","Rhone","Haute-Saone","Saone-et-Loire","Sarthe","Savoie","Haute-Savoie","Paris","Seine-Maritime","Seine-et-Marne","Yvelines","Deux-Sevres","Somme","Tarn","Tarn-et-Garonne","Var","Vaucluse","Vendee","Vienne","Haute-Vienne","Vosges","Yonne","Territoire de Belfort","Essonne","Hauts-de-Seine","Seine-St-Denis","Val-de-Marne","Val-D'Oise","Guadeloupe","Martinique","Guyane","La Reunion","Mayotte"];
    var nom_pref= ["Bourg-en-Bresse","Laon","Moulins","Digne","Gap","Nice","Privas","Charleville-Mézieres","Foix","Troyes","Carcassonne","Rodez","Marseille","Caen","Aurillac","Angouleme","La Rochelle","Bourges","Tulle","Ajaccio","Bastia","Dijon","Saint-Brieuc","Gueret","Perigueux","Besançon","Valence","Evreux","Chartres","Quimper","Nimes","Toulouse","Auch","Bordeaux","Montpellier","Rennes","Chateauroux","Tours","Grenoble","Lons-le-Saunier","Mont-de-Marsan","Blois","Saint-Etienne","Le Puy-en-Velay","Nantes","Orleans","Cahors","Agen","Mende","Angers","Saint-Lo","Chalons-en-Champagne","Chaumont","Laval","Nancy","Bar-le-Duc","Vannes","Metz","Nevers","Lille","Beauvais","Alencon","Arras","Clermont-Ferrand","Pau","Tarbes","Perpignan","Strasbourg","Colmar","Lyon","Vesoul","Macon","Le Mans","Chambéry","Annecy","Paris","Rouen","Melun","Versailles","Niort","Amiens","Albi","Montauban","Toulon","Avignon","La Roche-sur-Yon","Poitiers","Limoges","Epinal","Auxerre","Belfort","Évry","Nanterre","Bobigny","Creteil","Pontoise","Basse-Terre","Fort-de-France","Cayenne","Saint-Denis","Dzaoudzi"];
    var nom_reg = ["Auvergne-Rhone-Alpes","Hauts-de-France","Provence-Alpes-Cote d'Azur","Grand Est","Occitanie","Normandie","Nouvelle-Aquitaine","Centre-Val de Loire","Corse","Bourgogne-Franche-Comte","Bretagne","Pays de la Loire","Ile-de-France","Guadeloupe","Martinique","Guyane","La Reunion","Mayotte"];

    var select = document.getElementById("num_dep_id"); 

    for(var i = 0; i < num_dep.length; i++) {
        var opt = num_dep[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }

    var select = document.getElementById("nom_dep_id"); 
        
        for(var i = 0; i < nom_dep.length; i++) {
            var opt = nom_dep[i];
            select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
        }

        var select = document.getElementById("nom_reg_id"); 
        
        for(var i = 0; i < nom_reg.length; i++) {
            var opt = nom_reg[i];
            select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
        }

        var select = document.getElementById("nom_pref_id"); 
        
        for(var i = 0; i < nom_pref.length; i++) {
            var opt = nom_pref[i];
            select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
        }
    };	

function fonctStorageSetDep(result){


        var Dep_numero = document.getElementById("dep_numero");
        var Dep_nom = document.getElementById("dep_nom");
        var Dep_region = document.getElementById("dep_region");
        var Dep_superficie = document.getElementById("dep_superficie");
        var Dep_pop = document.getElementById("dep_pop");
        var Dep_densite = document.getElementById("dep_densite");
        var Dep_prefecture = document.getElementById("dep_prefecture");
        var Dep_prefecturepop = document.getElementById("dep_prefecturepop");
        var Dep_sousprefecture = document.getElementById("dep_sousprefecture");

        localStorage.setItem('Dep_numero','<%= result[0].num_dep %>');
        localStorage.setItem('Dep_nom','<%= result[0].nom_dep%>');
        localStorage.setItem('Dep_region','<%= result[0].nom_reg%>');
        localStorage.setItem('Dep_superficie','<%= result[0].superficie%>');
        localStorage.setItem('Dep_pop','<%= result[0].pop_dep%>%>');
        localStorage.setItem('Dep_densite','<%= result[0].densite%>');
        localStorage.setItem('Dep_prefecture','<%= result[0].nom_pref%>');
        localStorage.setItem('Dep_prefecturepop','<%= result[0].pop_pref%>');
        localStorage.setItem('Dep_sousprefecture','<%= result[0].sousprefecture%>');

    };

function fonctStorageGettDepChar(){

        var dep_num      =    localStorage.getItem('Dep_numero');
        var dep_nom      =    localStorage.getItem('Dep_nom');
        var dep_reg      =    localStorage.getItem('Dep_region');
        var dep_sup      =    localStorage.getItem('Dep_superficie');
        var dep_pop      =    localStorage.getItem('Dep_pop');
        var dep_dens     =    localStorage.getItem('Dep_densite');
        var dep_pref     =    localStorage.getItem('Dep_prefecture');
        var dep_prefpop  =    localStorage.getItem('Dep_prefecturepop');
        var dep_souspref =    localStorage.getItem('Dep_sousprefecture');

    };


    function fonctStorageSetKanji()
	{
		var inputIndex = document.getElementById("kanjiindex");
		var inputNiveau = document.getElementById("Niveau");
		var inputKanji = document.getElementById("kanji");
		var inputOnyomi = document.getElementById("onyomi");
		var inputKunyomi = document.getElementById("kunyomi");
		var inputTraduction = document.getElementById("traduction");
	
		localStorage.setItem("Index",inputIndex.value);
		localStorage.setItem("Niveau",inputNiveau.value);
		localStorage.setItem("Kanji",inputKanji.value);
		localStorage.setItem("Onyomi",inputOnyomi.value);
		localStorage.setItem("Kunyomi",inputKunyomi.value);
		localStorage.setItem("Traduction",inputTraduction.value);
	};

    function fonctionStorageGetKanji()
	{
		var inputIndex  =     localStorage.getItem("kanjiIndex");
		var inputNiveau =     localStorage.getItem("Niveau");
		var inputKanji  =     localStorage.getItem("Kanji");
		var inputOnyomi =     localStorage.getItem("Onyomi");
		var inputKunyomi =    localStorage.getItem("Kunyomi");
		var inputTraduction = localStorage.getItem("Traduction");

		var contenu = document.querySelector('caption').innerText;
		document.querySelector('caption').textContent = (contenu + " de " + inputNiveau);
		console.log(contenu + " de " + inputNiveau);
	};