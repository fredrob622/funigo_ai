// Dans votre js/includeHTML.js
function includeHTML() {
    var z, i, elmnt, file, xhr;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("data-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;

                        // ******************************************************
                        // C'EST ICI QU'IL FAUT APPELER LA FONCTION DU MENU !
                        // Assurez-vous que initializeHamburgerMenu est globale ou accessible ici.
                        if (typeof initializeHamburgerMenu === 'function') {
                            initializeHamburgerMenu();
                        } else {
                            console.warn("initializeHamburgerMenu n'est pas définie. Assurez-vous que menu_hamburger.js est chargé avant.");
                        }
                        // ******************************************************

                    }
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("data-include-html");
                    includeHTML(); // Pour les inclusions imbriquées
                }
            }
            xhr.open("GET", file, true);
            xhr.send();
            /*exit the function:*/
            return;
        }
    }
}
// Assurez-vous que 'includeHTML()' est appelée quelque part après le chargement du DOM initial
// par exemple, document.addEventListener('DOMContentLoaded', includeHTML);