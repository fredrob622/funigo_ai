// js/menu_hamburger.js

function initializeHamburgerMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        console.log("DEBUG: Menu toggle et nav list trouvés dans menu_hamburger.js.");

        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            console.log("DEBUG: Classe 'active' basculée sur nav-list. État actuel:", navList.classList.contains('active') ? "actif" : "inactif");
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    console.log("DEBUG: Lien cliqué, menu fermé.");
                }
            });
        });

    } else {
        console.warn("ATTENTION: Éléments du menu hamburger (.menu-toggle ou .nav-list) introuvables. Vérifiez le HTML et les chemins CSS.");
    }
}

// IMPORTANT : Ne PAS appeler initializeHamburgerMenu() ici.
// Nous l'appellerons dans index.html après le chargement dynamique.