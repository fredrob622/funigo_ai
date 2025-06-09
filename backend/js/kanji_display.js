// js/kanji_display.js

/**
 * Affiche les données de Kanji reçues de l'API dans un élément HTML spécifié.
 * @param {Array} kanjiData - Le tableau de données Kanji reçu de l'API.
 * @param {string} targetElementId - L'ID de l'élément HTML où afficher les Kanji.
 */
function displayKanjiData(kanjiData, targetElementId) {
    const container = document.getElementById(targetElementId);

    if (!container) {
        console.error(`Cible d'affichage Kanji (${targetElementId}) introuvable.`);
        return;
    }

    // Efface le contenu existant
    container.innerHTML = '';

    // Ajoutez un titre ou un en-tête pour la section Kanji
    const title = document.createElement('h1');
    title.textContent = 'Recherche de Kanji';
    title.style.textAlign = 'center';
    title.style.marginTop = '20px';
    container.appendChild(title);

    // Crée une grille ou une liste pour afficher les Kanji
    const kanjiGrid = document.createElement('div');
    kanjiGrid.classList.add('kanji-grid'); // Ajoutez une classe pour le style CSS

    if (kanjiData && kanjiData.length > 0) {
        kanjiData.forEach(kanji => {
            const kanjiCard = document.createElement('div');
            kanjiCard.classList.add('kanji-card'); // Classe pour le style de chaque carte

            // Adaptez cette partie en fonction de la structure exacte de vos données Kanji
            // Par exemple, si votre API renvoie { "kanji": "...", "lecture": "...", "meaning": "..." }
            const kanjiChar = document.createElement('div');
            kanjiChar.classList.add('kanji-char');
            kanjiChar.textContent = kanji.kanji || 'N/A'; // Assurez-vous que 'kanji' est la bonne clé
            kanjiCard.appendChild(kanjiChar);

            const kanjiReading = document.createElement('div');
            kanjiReading.classList.add('kanji-reading');
            kanjiReading.textContent = kanji.lecture || 'N/A'; // Assurez-vous que 'lecture' est la bonne clé
            kanjiCard.appendChild(kanjiReading);

            const kanjiMeaning = document.createElement('div');
            kanjiMeaning.classList.add('kanji-meaning');
            kanjiMeaning.textContent = kanji.meaning || 'N/A'; // Assurez-vous que 'meaning' est la bonne clé
            kanjiCard.appendChild(kanjiMeaning);

            // Ajoutez d'autres champs si votre API en renvoie (par ex: "grade", "strokes", etc.)
            // Exemple:
            // if (kanji.grade) {
            //     const kanjiGrade = document.createElement('div');
            //     kanjiGrade.textContent = `Grade: ${kanji.grade}`;
            //     kanjiCard.appendChild(kanjiGrade);
            // }

            kanjiGrid.appendChild(kanjiCard);
        });
    } else {
        const noResults = document.createElement('p');
        noResults.textContent = "Aucun Kanji trouvé.";
        noResults.style.textAlign = 'center';
        container.appendChild(noResults);
    }
    
    container.appendChild(kanjiGrid);
}