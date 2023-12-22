import { chargerProjets } from "./script.js";
// variable qui va stocker toutes les projets
let works = [];
// on selectionne le btn close et on lui ajoute un évenement
const btnCloseModalDelete = document.querySelector("#myModal .close");
btnCloseModalDelete.addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
});
//  Déclarez la fonction closeModal qui ferme la modal principal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  // Réinitialiser le champ d'entrée pour permettre une nouvelle sélection
  document.getElementById("imageInput").value = "";
  // Masquer les éléments
  hideInputImage();
  // Masquer l'élément imagePreview
  document.getElementById("imagePreview").classList.add("hide");
}
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Fonction pour supprimer un projet du DOM et du serveur en utilisant l'API
async function deleteProject(itemId) { 
  // Une fonction asynchrone (async) est une fonction JavaScript qui permet l'exécution de tâches sans bloquer le reste du code, facilitant ainsi le traitement de plusieurs opérations en parallèle.
  try {
    // Effectuer une requête HTTP DELETE pour supprimer le projet du serveur
    const response = await fetch(`http://localhost:5678/api/works/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    // Vérifier si la suppression sur le serveur a réussi
    if (response.status === 204) {
      // Si la suppression a réussi, afficher un message de succès dans la console
      console.log("Succès : Le projet a été supprimé.");

      // Filtrer les projets pour exclure celui qui vient d'être supprimé
      works = works.filter((work) => {
        return work.id != itemId;
      });

      // Mettre à jour l'affichage des œuvres après la suppression
      displayWorks(works);

      // Recharger les projets depuis le serveur pour mettre à jour la liste complète
      chargerProjets();
    } else {
      // Si la suppression a échoué, afficher un message d'erreur dans la console
      console.error("Erreur : Échec de la suppression du projet.");
    }
  } catch (error) {
    // Gérer les erreurs lors de la suppression du projet
    console.error("Erreur :", error);
  }
}

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Fonction pour afficher les œuvres dans la modal
function displayWorks(works) {
  // Récupérer l'élément du conteneur des œuvres dans la modal
  const worksContainer = document.getElementById("worksContainer");

  // Vider le contenu précédent de l'élément
  worksContainer.innerHTML = "";

  // Boucle à travers les œuvres et les ajoute à l'élément
  works.forEach(function (work) {
    // Créer un nouvel élément div pour chaque œuvre
    const workElement = document.createElement("div");

    // Ajouter le contenu HTML à l'élément div
    workElement.innerHTML = `
      <div style="display: flex; justify-content: flex-end;">
        <img src="${work.imageUrl}" alt="${work.title}" style="width: 78.12px; height: 104.08px;">
        <div class="delete-icon" style="margin-left: -20px;z-index:999";>
          <i class="fa-regular fa-trash-can"></i>
        </div>
      </div>
      <!-- Ajoutez d'autres détails de l'œuvre ici -->
    `;

    // Ajouter l'ID de l'œuvre comme attribut de données pour la suppression
    workElement.dataset.id = work.id;

    // Sélectionner l'icône de suppression et ajouter un écouteur de clic pour la suppression
    workElement.querySelector(".delete-icon").addEventListener("click", () => {
      deleteProject(work.id);
    });

    // Ajouter l'élément div à l'élément du conteneur des œuvres
    worksContainer.appendChild(workElement);
  });
}

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Fonction pour récupérer les œuvres depuis l'API
async function getWorksFromAPI() {
  // Une fonction asynchrone (async) est une fonction JavaScript qui permet l'exécution de tâches sans bloquer le reste du code, facilitant ainsi le traitement de plusieurs opérations en parallèle.
  try {
    // Effectuer une requête HTTP GET pour récupérer les œuvres depuis l'API
    const response = await fetch("http://localhost:5678/api/works");

    // Vérifier si la requête GET a réussi
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des œuvres depuis l'API."
      );
    }

    // Récupérer les données JSON de la réponse
    works = await response.json();

    // Appeler la fonction pour afficher les œuvres
    displayWorks(works);
  } catch (error) {
    // Gérer les erreurs lors de la récupération des œuvres
    console.error("Erreur lors de la récupération des œuvres:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Récupère la référence de la modal
  const modal = document.getElementById("myModal");
  // Assurez-vous que la modal n'est pas affichée au démarrage
  modal.style.display = "none";
  // Récupère la référence de l'élément qui contiendra les œuvres
  const worksContainer = document.getElementById("worksContainer");
  // Fonction pour ouvrir la modal et afficher les œuvres depuis l'API
  async function openModalAndDisplayWorks() {
    modal.style.display = "block";
    await getWorksFromAPI();
  }
  // Obtenez le span de modification et ajoutez un écouteur d'événements de clic
  const modifierSpan = document.querySelector(".modifier");
  if (modifierSpan) {
    modifierSpan.addEventListener("click", openModalAndDisplayWorks);
  }
});

// -------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Fonction pour ouvrir la modal
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  // Afficher les éléments
  showInputImage();
}

// Fonction pour vérifier si les champs du formulaire sont remplis
const checkInputs = () => {
  // Récupérer les valeurs des champs du formulaire
  const title = document.getElementById("titleInput").value.trim();
  const category = document.getElementById("categorySelect").value.trim();
  // value.trim() est utilisé pour nettoyer (supprimer les espaces blancs au début et à la fin) de la valeur d'un champ de saisie.

  // Vérifier si les valeurs sont vides
  if (title === "" || category === "" || imageInput.length === 0) {
    // Si au moins un champ est vide, désactiver le bouton de validation
    document.querySelector(".validateButton").classList.remove("active");
    return false; // Retourner false car les champs ne sont pas tous remplis
  } else {
    // Si tous les champs sont remplis, activer le bouton de validation
    document.querySelector(".validateButton").classList.add("active");
    return true; // Retourner true car tous les champs sont remplis
  }
};


// Sélectionnez l'élément input
const imageInput = document.getElementById("imageInput");

// Ajoutez un gestionnaire d'événements pour l'événement "change"
imageInput.addEventListener("change", function () {
  displayImage();
  checkInputs();
});

const categorySelect = document.getElementById("categorySelect");
categorySelect.addEventListener("change", function () {
  checkInputs();
});

const titleInput = document.getElementById("titleInput");
titleInput.addEventListener("change", function () {
  checkInputs();
});

// Fonction pour afficher l'image sélectionnée
function displayImage() {
  // Récupérer l'élément d'entrée de type fichier (input)
  const input = document.getElementById("imageInput");

  // Récupérer l'élément de prévisualisation de l'image
  const preview = document.getElementById("imagePreview");

  // Supprimer tous les enfants de l'élément de prévisualisation
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  // Récupérer le fichier sélectionné par l'utilisateur
  const file = input.files[0];

  // Vérifier si un fichier a été sélectionné
  if (file) {
    // Créer une instance de FileReader pour lire le contenu du fichier
    const reader = new FileReader();

    // Définir une fonction de rappel qui sera appelée lorsque la lecture est terminée
    reader.onload = function (e) {
      // Créer un élément image pour afficher la prévisualisation
      const img = document.createElement("img");
      img.src = e.target.result;
      // img.src = e.target.result; charge l'image sélectionnée en utilisant l'URL résultant de la lecture du fichier.

      img.style.width = "100%"; // Définir la largeur de l'image à 100%
      
      // Ajouter une classe pour appliquer un style personnalisé à l'image
      img.classList.add("custom-image-style");

      // Ajouter l'élément image à l'élément de prévisualisation
      preview.appendChild(img);

      // Masquer les éléments lorsque l'image est affichée 
      hideInputImage();

      // Afficher l'élément imagePreview en supprimant la classe "hide"
      preview.classList.remove("hide");
    };

    // Lire le contenu du fichier en tant que données URL
    reader.readAsDataURL(file);
  }
}


// Fonction pour afficher l'input pour upload une image
function showInputImage() {
  document.querySelector(".file-label").classList.remove("hide");
  document.querySelector(".description").classList.remove("hide");
  document.querySelector(".custom-icon").classList.remove("hide");
  // classList.add("hide") est utilisé pour rendre invisible l'élément 
}
// Fonction pour masquer l'input quand on a upload une image
function hideInputImage() {
  document.querySelector(".file-label").classList.add("hide");
  document.querySelector(".description").classList.add("hide");
  document.querySelector(".custom-icon").classList.add("hide");
    // classList.add("hide") est utilisé pour rendre invisible l'élément 
}

// OUVERTURE SECONDE MODAL

const addPhotoBtn = document.getElementById("addPhotoBtn");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton "Ajouter une photo"
addPhotoBtn.addEventListener("click", function () {
  // Fermez la première modal avant d'ouvrir la deuxième
  closeModal();
  openAddPhotoModal();
});

function openAddPhotoModal() {
  const addPhotoModal = document.getElementById("addPhotoModal");
  addPhotoModal.style.display = "block";
  // Afficher les éléments
  showInputImage();
}
const backButton = document.querySelector("#addPhotoModal .backButton");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton de retour
backButton.addEventListener("click", goBack);

// Fonction pour retourner à la modal principale
function goBack() {
  const addPhotoModal = document.getElementById("addPhotoModal");
  addPhotoModal.style.display = "none";
  // Réinitialiser le champ d'entrée pour permettre une nouvelle sélection
  document.getElementById("imageInput").value = "";
  // Masquer les éléments
  hideInputImage();
  // Masquer l'élément imagePreview
  document.getElementById("imagePreview").classList.add("hide");
  // Afficher la modal principale
  openModal();
}
// selection du boutton modal sur la modal 2
const closeButton = document.querySelector("#addPhotoModal .close");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton de fermeture
closeButton.addEventListener("click", closeAddPhotoModal);

// Fonction pour fermer les deux modales la modal add et la principal
function closeAddPhotoModal() {
  const modal = document.getElementById("myModal");
  const addPhotoModal = document.getElementById("addPhotoModal");

  // Masquer les deux modales
  modal.style.display = "none";
  addPhotoModal.style.display = "none";
}

// ------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Sélectionnez le bouton de validation
const validateButton = document.querySelector(".validateButton");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton de validation
validateButton.addEventListener("click", async function () {
  await validatePhoto();
});
// Fonction pour valider la photo
async function validatePhoto() {
  // Une fonction asynchrone (async) est une fonction JavaScript qui permet l'exécution de tâches sans bloquer le reste du code, facilitant ainsi le traitement de plusieurs opérations en parallèle.
  // Récupérer les valeurs de chaque input du formulaire
  const title = document.getElementById("titleInput").value;
  const category = document.getElementById("categorySelect").value;
  const imageInput = document.getElementById("imageInput");

  // Vérifier si les champs du formulaire sont remplis correctement
  if (!title || !category || imageInput.files.length === 0) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  // Récupérer le fichier image du formulaire
  const imageFile = imageInput.files[0];

  // Créer un objet FormData pour envoyer les données du formulaire
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", imageFile);

  try {
    // Récupérer le jeton d'authentification stocké localement
    const authToken = localStorage.token;

    // Effectue une requête HTTP POST pour ajouter une nouvelle photo
    const response = await fetch("http://localhost:5678/api/works", {
      // Spécifie la méthode de la requête comme étant POST
      method: "POST",
      // Utilise l'objet FormData contenant les données de la nouvelle photo comme corps de la requête
      body: formData,
      // Inclut l'en-tête d'autorisation avec le jeton (token) d'authentification Bearer
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });


    // Vérifier si la requête POST a réussi
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la requête POST. Veuillez vérifier vos informations d'authentification."
      );
    }

    // Récupérer les données JSON de la réponse
    const data = await response.json();

    // Ajouter la nouvelle photo à la liste des projets
    works.push(data);

    // Mettre à jour l'affichage des projets
    displayWorks(works);
    chargerProjets();

    // Réinitialiser les champs du formulaire et fermer la fenêtre modale
    document.getElementById("titleInput").value = "";
    closeAddPhotoModal();
  } catch (error) {
    console.error("Erreur lors de la requête POST:", error.message);
  }
}

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

console.log(localStorage.token);
