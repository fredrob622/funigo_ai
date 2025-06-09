// js/menu_hamburger.js

function initializeHamburgerMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        console.log("DEBUG: Menu toggle et nav list trouvés dans menu_hamburger.js.");

        // Gère l'ouverture/fermeture principale du menu hamburger
        menuToggle.addEventListener('click', (event) => {
            event.preventDefault();
            navList.classList.toggle('active');
            console.log("DEBUG: Classe 'active' basculée sur nav-list. État actuel:", navList.classList.contains('active') ? "actif" : "inactif");
        });

        // 1. Gérer le clic sur les liens PARENTS avec sous-menus (ex: "Kanji" / "Langue")
        navList.querySelectorAll('.has-sous-menu > a').forEach(parentLink => {
            parentLink.addEventListener('click', (event) => {
                event.preventDefault(); // TRÈS IMPORTANT : Empêche la navigation du lien parent
                event.stopPropagation(); // Empêche le clic de remonter

                console.log(`DEBUG: Clic sur lien parent: ${parentLink.getAttribute('href')}`);

                // Trouver le sous-menu associé à ce lien parent
                const subMenu = parentLink.closest('li').querySelector('.sous-sous-menu');
                if (subMenu) {
                    subMenu.classList.toggle('active'); // Basculer l'état "actif" du sous-menu
                    console.log(`DEBUG: Sous-menu basculé. État actuel: ${subMenu.classList.contains('active') ? "actif" : "inactif"}`);
                }
            });

            // Gérer les touches pour le lien parent aussi, si nécessaire pour le tactile
            parentLink.addEventListener('touchend', (event) => {
                event.preventDefault();
                event.stopPropagation();
                console.log(`DEBUG: Touchend sur lien parent: ${parentLink.getAttribute('href')}`);
                const subMenu = parentLink.closest('li').querySelector('.sous-sous-menu');
                if (subMenu) {
                    subMenu.classList.toggle('active');
                }
            });
        });


        // 2. Gérer le clic sur les liens enfants (ceux dans les sous-menus, ex: "Dico kanji")
        // NOTE: On peut attacher le gestionnaire directement aux liens à l'intérieur des .sous-sous-menu
        navList.querySelectorAll('.sous-sous-menu a').forEach(childLink => {
            childLink.addEventListener('click', (event) => {
                event.preventDefault(); // Empêche la navigation par défaut
                event.stopPropagation(); // Empêche la propagation

                const targetHref = childLink.getAttribute('href');
                console.log(`DEBUG: Lien enfant cliqué dans sous-menu: ${targetHref}`);

                // Ferme tous les sous-menus et le menu principal après le clic
                navList.classList.remove('active');
                navList.querySelectorAll('.sous-sous-menu').forEach(sm => sm.classList.remove('active'));
                console.log("DEBUG: Tous les menus/sous-menus fermés après clic sur lien enfant.");

                // Navigue après un petit délai
                setTimeout(() => {
                    window.location.href = targetHref;
                    console.log(`DEBUG: Navigation initiée vers ${targetHref}`);
                }, 250); // Délai de 250 ms
            });

            // Gérer les événements tactiles pour les liens enfants
            childLink.addEventListener('touchend', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const targetHref = childLink.getAttribute('href');
                console.log(`DEBUG: Touchend sur lien enfant: ${targetHref}`);

                navList.classList.remove('active');
                navList.querySelectorAll('.sous-sous-menu').forEach(sm => sm.classList.remove('active'));

                setTimeout(() => {
                    window.location.href = targetHref;
                    console.log(`DEBUG: Navigation initiée vers ${targetHref} après touchend.`);
                }, 250);
            }, { passive: false }); // Important pour preventDefault sur touchend
        });

    } else {
        console.warn("ATTENTION: Éléments du menu hamburger (.menu-toggle ou .nav-list) introuvables. Vérifiez le HTML et les chemins CSS.");
    }
}