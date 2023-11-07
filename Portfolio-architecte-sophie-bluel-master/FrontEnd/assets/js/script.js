// Sélectionnez l'élément HTML avec la classe "tous" et stockez-le dans la variable "tous"
const tous = document.querySelector(".tous");

// Sélectionnez l'élément HTML avec la classe "gallery" et stockez-le dans la variable "galerie"
const galerie = document.querySelector(".gallery");

// Créez une variable booléenne "isTousClicked" et initialisez-la à "false"
let isTousClicked = false;

// Définition de la fonction "chargerProjets" qui récupère les projets depuis une API
function chargerProjets() {
    // Effectuez une requête HTTP GET pour récupérer les données des projets depuis une URL
    fetch("http://localhost:5678/api/works")
        .then(response => response.json()) // Parsez la réponse HTTP en JSON
        .then(data => {
            // Réinitialisez le contenu de la galerie à vide
            galerie.innerHTML = "";
            
            // Parcourez les données des projets et créez des éléments HTML pour les afficher
            data.forEach(projet => {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = projet.imageUrl;
                img.alt = projet.title;
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = projet.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                galerie.appendChild(figure);
            });
        })
        .catch(error => {
            // En cas d'erreur, affichez un message d'erreur dans la console
            console.error("Une erreur s'est produite lors de la récupération des données :", error);
        });
}

// Sélectionnez le bouton "Tous" et changez son style pour simuler un clic
tous.style.backgroundColor = "#1D6154";
tous.style.color = "white";
chargerProjets(); // Chargez les projets
isTousClicked = true; // Définissez "isTousClicked" à "true"

// Définition de la fonction "toggleTousButton" qui gère le bouton "Tous"
function toggleTousButton() {
    // Vider la galerie en réinitialisant son contenu
    galerie.innerHTML = "";

    if (isTousClicked) {
        // Désélectionnez les autres boutons de catégorie en réinitialisant leur style
        categoryButtons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "#1D6154";
        });

        // Rétablissez le style du bouton "Tous" pour le désélectionner
        tous.style.backgroundColor = "white";
        tous.style.color = "#1D6154";
        isTousClicked = false; // Réglez "isTousClicked" à "false"
    } else {
        // Sélectionnez le bouton "Tous" en changeant son style
        tous.style.backgroundColor = "#1D6154";
        tous.style.color = "white";
        chargerProjets(); // Chargez à nouveau les projets
        isTousClicked = true; // Réglez "isTousClicked" à "true"

        // Rétablissez le style de base des autres boutons de catégorie
        categoryButtons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "#1D6154";
        });
    }
}

// Ajoutez un écouteur d'événement pour le bouton "Tous" qui appelle la fonction "toggleTousButton" lors du clic
tous.addEventListener("click", toggleTousButton);

// Sélectionnez tous les éléments HTML avec la classe "category-item" et stockez-les dans la variable "categoryButtons"
const categoryButtons = document.querySelectorAll(".category-item");

// Définition de la fonction "filterAndDisplayProjects" pour filtrer et afficher des projets en fonction de la catégorie
function filterAndDisplayProjects(categoryId) {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            galerie.innerHTML = ""; // Réinitialisez le contenu de la galerie
            
            // Filtrez les projets en fonction de la catégorie sélectionnée et affichez-les
            data
                .filter(projet => projet.categoryId === parseInt(categoryId))
                .forEach(projet => {
                    const figure = document.createElement("figure");
                    const img = document.createElement("img");
                    img.src = projet.imageUrl;
                    img.alt = projet.title;
                    const figcaption = document.createElement("figcaption");
                    figcaption.textContent = projet.title;
                    figure.appendChild(img);
                    figure.appendChild(figcaption);
                    galerie.appendChild(figure);
                });
        })
        .catch(error => {
            // En cas d'erreur, affichez un message d'erreur dans la console
            console.error("Une erreur s'est produite lors de la récupération des données :", error);
        });
}

// Ajoutez des écouteurs d'événement aux boutons de catégorie pour filtrer et afficher les projets
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        const categoryId = this.getAttribute("data-category");
        filterAndDisplayProjects(categoryId);
        isTousClicked = false; // Réglez "isTousClicked" à "false"
        tous.style.backgroundColor = "white";
        tous.style.color = "#1D6154";
    });
});

// Ajoutez des écouteurs d'événement aux boutons de catégorie pour gérer le style lors du clic
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        const categoryId = this.getAttribute("data-category");
        filterAndDisplayProjects(categoryId);
        isTousClicked = false; // Réglez "isTousClicked" à "false"
        tous.style.backgroundColor = "white";
        tous.style.color = "#1D6154";

        // Réinitialisez le style de fond et de texte de tous les boutons de catégorie
        categoryButtons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "#1D6154";
        });

        // Changez le style de fond du bouton cliqué
        this.style.backgroundColor = "#1D6154";
        this.style.color = "white";
    });
});
