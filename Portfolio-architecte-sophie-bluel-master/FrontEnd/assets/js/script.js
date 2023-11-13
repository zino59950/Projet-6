
let allWorks = []

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
            allWorks=data
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
                console.log(allWorks);
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

// const modifier = document.querySelector(".modifier")
// const categorylist = document.querySelector(".category-list")
// if (localStorage.token) {

//     modifier.style.display = "inline-block"

//     categorylist.style.display = "none"
// }

// Déclarez la fonction closeModal dans le contexte global
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    // Récupère la référence de la modal
    var modal = document.getElementById("myModal");

    // Assurez-vous que la modal n'est pas affichée au démarrage
    modal.style.display = "none";

    // Récupère la référence de l'élément qui contiendra les œuvres
    var worksContainer = document.getElementById("worksContainer");

    // Fonction pour ouvrir la modal
    function openModal() {
        modal.style.display = "block";
        displayWorks();
    }

    // Obtenez le span de modification et ajoutez un écouteur d'événements de clic
    var modifierSpan = document.querySelector(".modifier");
    if (modifierSpan) {
        modifierSpan.addEventListener("click", openModal);
    }
});


// Fonction pour afficher les œuvres dans la modal
function displayWorks() {
    // Votre tableau d'œuvres récupérées depuis l'API
    let allWorks = [
        { id: 1, title: 'Abajour Tahina', imageUrl: 'http://localhost:5678/images/abajour-tahina1651286843956.png', categoryId: 1, userId: 1 },
        { id: 2, title: 'Appartement Paris V', imageUrl: 'http://localhost:5678/images/appartement-paris-v1651287270508.png', categoryId: 2, userId: 1 },
        { id: 3, title: 'Restaurant Sushisen - Londres', imageUrl: 'http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png', categoryId: 3, userId: 1 },
        { id: 4, title: 'Villa “La Balisiere” - Port Louis', imageUrl: 'http://localhost:5678/images/la-balisiere1651287350102.png', categoryId: 2, userId: 1 },
        { id: 5, title: 'Structures Thermopolis', imageUrl: 'http://localhost:5678/images/structures-thermopolis1651287380258.png', categoryId: 1, userId: 1 },
        { id: 6, title: 'Appartement Paris X', imageUrl: 'http://localhost:5678/images/appartement-paris-x1651287435459.png', categoryId: 2, userId: 1 },
        { id: 7, title: 'Pavillon “Le coteau” - Cassis', imageUrl: 'http://localhost:5678/images/le-coteau-cassis1651287469876.png', categoryId: 2, userId: 1 },
        { id: 8, title: 'Villa Ferneze - Isola d’Elba', imageUrl: 'http://localhost:5678/images/villa-ferneze1651287511604.png', categoryId: 2, userId: 1 },
        { id: 9, title: 'Appartement Paris XVIII', imageUrl: 'http://localhost:5678/images/appartement-paris-xviii1651287541053.png', categoryId: 2, userId: 1 },
        { id: 10, title: 'Bar “Lullaby” - Paris', imageUrl: 'http://localhost:5678/images/bar-lullaby-paris1651287567130.png', categoryId: 3, userId: 1 },
        { id: 11, title: 'Hotel First Arte - New Delhi', imageUrl: 'http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png', categoryId: 3, userId: 1 },
        // Ajoutez d'autres œuvres ici
    ];

    // Vide le contenu précédent de l'élément
    worksContainer.innerHTML = "";

    // Boucle à travers les œuvres et les ajoute à l'élément
    allWorks.forEach(function(work) {
        var workElement = document.createElement("div");
        workElement.innerHTML = `
            <div class="delete-icon">
                <i class="fas fa-trash"></i>
            </div>
            <img src="${work.imageUrl}" alt="${work.title}" style="width: 78.12px; height: 104.08px;;">
            <!-- Ajoutez d'autres détails de l'œuvre ici -->
        `;
        worksContainer.appendChild(workElement);
    });
}

// Appel de la fonction pour afficher les œuvres lors de l'ouverture de la modal
openModal();



// -------------------------------------------------------------------------------------------



// Function to open the modal for adding a photo
function openAddPhotoModal() {
    var addPhotoModal = document.getElementById("addPhotoModal");
    addPhotoModal.style.display = "block";
}

// Function to close the modal for adding a photo
function closeAddPhotoModal() {
    var addPhotoModal = document.getElementById("addPhotoModal");
    addPhotoModal.style.display = "none";
}
// Function to go back to the main modal
function goBack() {
    closeAddPhotoModal(); // Ferme la modal d'ajout de photo
    openModal(); // Réouvre la modal principale
}
// Fonction pour valider la photo (à personnaliser selon vos besoins)
function validatePhoto() {
    var input = document.getElementById('imageInput');
    var file = input.files[0];

    if (file) {
        // Vous pouvez afficher l'image ici ou effectuer d'autres opérations avec le fichier
        var reader = new FileReader();
        reader.onload = function (e) {
            // Créez une balise d'image et attribuez-lui la source de l'image chargée
            var imageElement = document.createElement('img');
            imageElement.src = e.target.result;

            // Ajoutez l'image à l'élément de la modal (à personnaliser selon votre structure HTML)
            var modalContent = document.querySelector('.modal-content.projet-modal-content');
            modalContent.appendChild(imageElement);
        };
        reader.readAsDataURL(file);
    }

    // Ajoutez ici d'autres actions à effectuer lors de la validation de la photo
}
// Fonction pour activer le sélecteur de fichier lors du clic sur le bouton personnalisé
document.querySelector('.custom-file-upload').addEventListener('click', function () {
    document.getElementById('imageInput').click();
});

// Fonction pour valider la photo (à personnaliser selon vos besoins)
function validatePhoto() {
    var input = document.getElementById('imageInput');
    var file = input.files[0];

    if (file) {
        // Vous pouvez afficher l'image ici ou effectuer d'autres opérations avec le fichier
        var reader = new FileReader();
        reader.onload = function (e) {
            // Créez une balise d'image et attribuez-lui la source de l'image chargée
            var imageElement = document.createElement('img');
            imageElement.src = e.target.result;

            // Ajoutez l'image à l'élément de la modal (à personnaliser selon votre structure HTML)
            var modalContent = document.querySelector('.modal-content.projet-modal-content');
            modalContent.appendChild(imageElement);
        };
        reader.readAsDataURL(file);
    }

    // Ajoutez ici d'autres actions à effectuer lors de la validation de la photo
}
function validatePhoto() {
    var input = document.getElementById('imageInput');
    var file = input.files[0];

    // Récupérez la valeur du titre
    var title = document.getElementById('titleInput').value;

    // Récupérez l'élément div pour afficher l'image
    var imageDisplay = document.getElementById('imageDisplay');

    if (file) {
        // Créez une balise d'image
        var imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(file); // Utilisez l'URL du fichier pour l'afficher

        // Ajoutez le titre en tant que légende
        var captionElement = document.createElement('p');
        captionElement.textContent = title;

        // Effacez le contenu précédent de l'élément imageDisplay
        imageDisplay.innerHTML = "";

        // Ajoutez l'image et la légende à l'élément imageDisplay
        imageDisplay.appendChild(imageElement);
        imageDisplay.appendChild(captionElement);
    }

    // Ajoutez ici d'autres actions à effectuer lors de la validation de la photo
}



