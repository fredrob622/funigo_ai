// js/acceuil.js

function initializeImageCarousel() {
    const gridContainer = document.querySelector('.grid-container');
    
    // Vérification cruciale : Si gridContainer n'est pas trouvé, le reste du script échouera.
    if (!gridContainer) {
        console.error("Erreur: Le conteneur de grille (.grid-container) est introuvable. Le carrousel ne peut pas être initialisé.");
        return; // Arrête l'exécution de la fonction
    }

    const images = gridContainer.querySelectorAll('img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const gridSize = 9;
    let currentIndex = 0;
    let intervalId; // Pour stocker l'ID de l'intervalle

    function updateGrid() {
        const currentOrder = Array.from({ length: gridSize }, (_, i) => (currentIndex + i) % gridSize);
        images.forEach((img, index) => {
            img.style.order = currentOrder[index];
        });
    }

    function slideNext() {
        currentIndex = (currentIndex + 1) % gridSize;
        updateGrid();
    }

    function slidePrev() {
        currentIndex = (currentIndex - 1 + gridSize) % gridSize;
        updateGrid();
    }

    function startAutoSlide() {
        // Assurez-vous qu'il n'y a pas d'intervalle déjà en cours
        stopAutoSlide(); 
        intervalId = setInterval(slideNext, 3000); // Change d'image toutes les 3 secondes (3000 ms)
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    // Ajout de vérifications pour les boutons aussi
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide(); // Arrêter l'auto-slide lors d'une interaction manuelle
            slideNext();
            startAutoSlide(); // Redémarrer l'auto-slide après l'interaction
        });
    } else {
        console.warn("Bouton 'next' introuvable pour le carrousel.");
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide(); // Arrêter l'auto-slide lors de l'interaction manuelle
            slidePrev();
            startAutoSlide(); // Redémarrer l'auto-slide après l'interaction
        });
    } else {
        console.warn("Bouton 'prev' introuvable pour le carrousel.");
    }

    // Démarrer le défilement automatique au chargement de la page
    startAutoSlide();

    // Initialisation de la grille
    updateGrid();
}

// IMPORTANT : Ne PAS appeler initializeImageCarousel() ici.
// Nous l'appellerons dans index.html après le chargement dynamique.