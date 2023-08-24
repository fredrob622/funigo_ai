*** Mise en page markdow **********************************************************************

Le lien de la video de e-genieclimatique pour écrire en markdown

[Git07-Mettre un README.md](https://www.youtube.com/watch?v=4lg3YyugRZQ&list=PLF88SKt6r7NYv4wBdjB5_DChbenj5JHKC&index=8)

# Fichier README.md du projet funigo
----------------------------------------------------------------------------------------------

1. ## __Démarrer__VirtualBox__
-------
2. ## __Démarrer__le__host__KUN18OP__
-------
3. ## __Démarrer__le__BACKEND__
-------

*aller dans le répertoire D:\funigo\backend*
PS D:\funigo> cd .\backend         
PS D:\funigo\backend> ls


    *Répertoire : D:\funigo\backend*


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        02/11/2022     11:46                archive
d-----        19/10/2022     22:36                cartes
d-----        21/10/2022     09:30                css
d-----        25/08/2022     17:39                db
d-----        18/10/2022     12:05                html
d-----        18/10/2022     12:22                IHM
d-----        02/11/2022     11:46                images
d-----        21/10/2022     15:44                js
d-----        04/08/2022     19:09                middlewares
d-----        15/10/2022     19:08                node_modules
d-----        21/10/2022     15:40                public
d-----        16/10/2022     19:35                routes
-a----        18/08/2022     16:57            187 .env
-a----        17/10/2022     11:53           1790 app.js
-a----        20/08/2022     15:41           3613 index.html
-a----        15/10/2022     19:08          99601 package-lock.json
-a----        15/10/2022     19:08            531 package.json
-a----        07/08/2022     22:38            809 server.js

*Démarrer le server.js*

PS D:\funigo\backend> nodemon server.js
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
jap
D:\funigo\backend\routes
D:\funigo\backend\routes
D:\funigo\backend\routes
D:\funigo\backend\routes
Express Application exemple à l'écoute sur le port 5000!
Connection Established Successfully

4. ## __Demarrer__le__FRONTEND__

> Vérifier la présence du fichier __index.html__
Dans PS D:\funigo> cd .\frontend\
PS D:\funigo\frontend> ls


    Répertoire : D:\funigo\frontend


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        23/09/2022     19:41                adresse_api
d-----        19/10/2022     18:38                cartes
d-----        22/10/2022     10:37                css
d-----        25/08/2022     19:20                culture
d-----        25/08/2022     19:20                diaporama
d-----        01/10/2022     16:06                geo
d-----        22/10/2022     09:21                html
d-----        01/10/2022     22:12                icones
d-----        23/09/2022     15:59                images
d-----        17/10/2022     22:36                js
d-----        25/08/2022     19:20                langue
d-----        25/08/2022     19:20                voyage
-a----        19/10/2022     16:02          23198 Departement_char.json
-a----        25/10/2022     11:33            833 index.html
-a----        16/01/2023     16:11           9623 index_vertical.html

> Demarrer sous vscode avec le liveserver

http://127.0.0.1:5501/frontend/index.html