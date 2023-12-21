let allWorks = [];
// Sélectionnez l'élément HTML avec la classe "tous" et stockez-le dans la variable "tous"
const tous = document.querySelector(".tous");
// Sélectionnez l'élément HTML avec la classe "gallery" et stockez-le dans la variable "galerie"
const galerie = document.querySelector(".gallery");
// Créez une variable booléenne "isTousClicked" et initialisez-la à "false"
let isTousClicked = false;
// Définition de la fonction "chargerProjets" pour récupérer et afficher les projets depuis une API
function chargerProjets() {
  // Effectuer une requête HTTP GET pour récupérer les données des projets depuis l'API
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json()) // Parsez la réponse HTTP en JSON
    .then((data) => {
      // Réinitialiser le contenu de la galerie à vide
      galerie.innerHTML = "";

      // Stocker toutes les œuvres dans la variable "allWorks" (pour une utilisation éventuelle)
      allWorks = data;

      // Parcourir les données des projets et créer des éléments HTML pour les afficher
      data.forEach((projet) => {
        // Créer un élément "figure" pour chaque projet
        const figure = document.createElement("figure");

        // Créer un élément "img" pour afficher l'image du projet
        const img = document.createElement("img");
        img.src = projet.imageUrl; // Définir la source de l'image
        img.alt = projet.title; // Définir le texte alternatif de l'image

        // Créer un élément "figcaption" pour afficher le titre du projet
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = projet.title; // Définir le texte du figcaption

        // Ajouter l'élément "img" et "figcaption" à l'élément "figure"
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Ajouter l'élément "figure" à la galerie
        galerie.appendChild(figure);

        // Afficher toutes les œuvres dans la console
        console.log(allWorks);
      });
    })
    .catch((error) => {
      // En cas d'erreur, afficher un message d'erreur dans la console
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    });
}


// --------------------------------------------------------------------------------------------------------

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
    categoryButtons.forEach((btn) => {
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
    categoryButtons.forEach((btn) => {
      btn.style.backgroundColor = "white";
      btn.style.color = "#1D6154";
    });
  }
}
// écouteur d'événement pour le bouton "Tous" qui appelle la fonction "toggleTousButton" lors du clic
tous.addEventListener("click", toggleTousButton);
// Stous les éléments HTML avec la classe "category-item" et 
// stockez-les dans la variable "categoryButtons"
const categoryButtons = document.querySelectorAll(".category-item");

// --------------------------------------------------------------------------------------------------------

// Définition de la fonction "filterAndDisplayProjects" pour filtrer et 
// afficher des projets en fonction de la catégorie
function filterAndDisplayProjects(categoryId) {
  // Effectuer une requête HTTP GET pour récupérer les projets depuis l'API
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json()) // Parsez la réponse HTTP en JSON
    .then((data) => {
      // Réinitialiser le contenu de la galerie à vide
      galerie.innerHTML = "";

      // Filtrer les projets en fonction de la catégorie sélectionnée et les afficher
      data
        .filter((projet) => projet.categoryId === parseInt(categoryId))
        .forEach((projet) => {
          // Créer les éléments HTML pour chaque projet
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          img.src = projet.imageUrl;
          img.alt = projet.title;
          const figcaption = document.createElement("figcaption");
          figcaption.textContent = projet.title;

          // Ajouter les éléments au DOM
          figure.appendChild(img);
          figure.appendChild(figcaption);
          galerie.appendChild(figure);
        });
    })
    .catch((error) => {
      // En cas d'erreur, afficher un message d'erreur dans la console
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    });
}


// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

// Ajoutez des écouteurs d'événement aux boutons de catégorie pour gérer le style lors du clic
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Récupérer l'ID de la catégorie à partir de l'attribut "data-category"
    const categoryId = this.getAttribute("data-category");

    // Appeler la fonction pour filtrer et afficher les projets en fonction de la catégorie
    filterAndDisplayProjects(categoryId);

    // Réinitialiser la variable "isTousClicked" à "false"
    isTousClicked = false;

    // Réinitialiser le style de fond et de texte du bouton "Tous"
    tous.style.backgroundColor = "white";
    tous.style.color = "#1D6154";

    // Réinitialiser le style de fond et de texte de tous les boutons de catégorie
    categoryButtons.forEach((btn) => {
      btn.style.backgroundColor = "white";
      btn.style.color = "#1D6154";
    });

    // Changer le style de fond et de texte du bouton cliqué
    this.style.backgroundColor = "#1D6154";
    this.style.color = "white";
  });
});


// --------------------------------------------------------------------------------------------------------

//BOUTTON LOGOUT QUI REMPLACE LE BOUTON LOGIN--
const modifier = document.querySelector(".modifier");

// Sélectionner l'élément avec la classe "category-list"
const categorylist = document.querySelector(".category-list");

// Vérifier si l'utilisateur est connecté en vérifiant la présence du jeton d'authentification
if (localStorage.token) {
  // Si connecté, masquer la liste des catégories et le bouton de login,
  // et afficher le bouton de modification et de déconnexion
  document.getElementById("categoryList").style.display = "none";
  document.querySelector(".btn-login").style.display = "none";
  document.querySelector(".mode-edit").style.display = "block";

  // Sélectionner l'élément avec la classe "btn-logout"
  const logout = document.querySelector(".btn-logout");

  // Afficher le bouton de déconnexion
  logout.style.display = "block";

  // Ajouter un écouteur d'événement au bouton de déconnexion
  logout.addEventListener("click", function () {
    // Supprimer le jeton d'authentification du stockage local
    localStorage.removeItem("token");

    // Recharger la page pour effectuer la déconnexion
    window.location.reload();
  });
} else {
  // Si non connecté, masquer le bouton de modification
  document.querySelector(".modifier").style.display = "none";
}


export { chargerProjets };
