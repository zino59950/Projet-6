// Récupération de l'élément "tous" en utilisant sa classe
const tous = document.querySelector(".tous");

// Récupération de l'élément de la galerie
const galerie = document.querySelector(".gallery");

// Ajout d'une variable pour suivre l'état du bouton
let isTousClicked = false;

// Fonction pour charger les projets
function chargerProjets() {
    // Utilisez fetch pour récupérer les données depuis votre API
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            data.forEach(projet => {
                console.log("Projet : ", projet);
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
            console.error("Une erreur s'est produite lors de la récupération des données :", error);
        });
}

// Fonction pour activer/désactiver le bouton "Tous"
function toggleTousButton() {
    if (isTousClicked) {
        // Si "tous" est déjà cliqué, réinitialisez les couleurs et videz la galerie
        tous.style.backgroundColor = "white";
        tous.style.color = "#1D6154";
        galerie.innerHTML = "";
        isTousClicked = false; // Réinitialisez l'état
    } else {
        // Sinon, changez la couleur de fond de l'élément "tous" au clic
        tous.style.backgroundColor = "#1D6154";
        tous.style.color = "white";

        // Appelez la fonction pour charger les projets
        chargerProjets();

        isTousClicked = true; // Mettez à jour l'état
    }
}

// Ajout d'un gestionnaire d'événements au clic sur l'élément "tous"
tous.addEventListener("click", toggleTousButton);

// Appel initial de la fonction pour activer le bouton "Tous"
toggleTousButton();




//----------------------------------------------------------------------------------

// Sélectionnez les boutons categoryId par leur classe
const categoryButtons = document.querySelectorAll(".category-item");

// Créez une fonction pour filtrer et afficher les projets en fonction de la categoryId
function filterAndDisplayProjects(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      // Filtrer les projets en fonction de la categoryId
      const filteredProjects = data.filter(projet => projet.categoryId === parseInt(categoryId));

      // Effacez le contenu actuel de la galerie
      galerie.innerHTML = "";

      // Affichez les projets correspondants dans la galerie
      filteredProjects.forEach(projet => {
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
      console.error("Une erreur s'est produite lors de la récupération des données :", error);
    });
}

// Ajoutez un gestionnaire d'événements au clic de chaque bouton categoryId
categoryButtons.forEach(button => {
  button.addEventListener("click", function () {
    const categoryId = this.getAttribute("data-category");
    filterAndDisplayProjects(categoryId);
  });
});

// Maintenez le code d'origine pour le bouton "Tous"
tous.addEventListener("click", function () {
  // ...
});
// ---------------------------------
// Créez une variable pour suivre l'état du bouton actif
let activeCategoryId = null;

// Ajoutez un gestionnaire d'événements au clic de chaque bouton categoryId
categoryButtons.forEach(button => {
  button.addEventListener("click", function () {
    const categoryId = this.getAttribute("data-category");

    // Réinitialisez la couleur de fond et du texte de tous les boutons categoryId
    categoryButtons.forEach(btn => {
      btn.style.backgroundColor = "white";
      btn.style.color = "#1D6154";
    });

    // Si le bouton "Tous" est déjà cliqué, réinitialisez les couleurs et videz la galerie
    if (isTousClicked) {
      tous.style.backgroundColor = "white";
      tous.style.color = "#1D6154";
      galerie.innerHTML = "";
      isTousClicked = false;
    }

    // Si le bouton actif est le même que le bouton cliqué, désactivez-le
    if (activeCategoryId === categoryId) {
      activeCategoryId = null;
    } else {
      // Sinon, changez la couleur de fond et du texte du bouton cliqué
      this.style.backgroundColor = "#1D6154";
      this.style.color = "white";
      activeCategoryId = categoryId;
    }

    // Appelez la fonction pour filtrer et afficher les projets en fonction de la categoryId
    if (activeCategoryId) {
      filterAndDisplayProjects(activeCategoryId);
    }
  });
});


