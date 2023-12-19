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
  try {
    const response = await fetch(`http://localhost:5678/api/works/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    if (response.status === 204) {
      console.log("Succès : Le projet a été supprimé.");
      // on filtre et on retourne tous les éléments qui n'ont pas l'id qu'on supprime
      works = works.filter((work) => {
        return work.id != itemId;
      });
      displayWorks(works);
      chargerProjets();
    } else {
      console.error("Erreur : Échec de la suppression du projet.");
    }
  } catch (error) {
    console.error("Erreur :", error);
  }
}
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Fonction pour afficher les œuvres dans la modal
function displayWorks(works) {
  const worksContainer = document.getElementById("worksContainer");
  // Vide le contenu précédent de l'élément
  worksContainer.innerHTML = "";
  // Boucle à travers les œuvres et les ajoute à l'élément
  works.forEach(function (work) {
    const workElement = document.createElement("div");
    workElement.innerHTML = `
            <div style="display: flex; justify-content: flex-end;">
                <img src="${work.imageUrl}" alt="${work.title}" style="width: 78.12px; height: 104.08px;">
                <div class="delete-icon" style="margin-left: -20px;z-index:999";>
                  <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>
            <!-- Ajoutez d'autres détails de l'œuvre ici -->
        `;
    // Ajoutez l'ID de l'œuvre comme attribut de données pour la suppression
    workElement.dataset.id = work.id;
    // on selectionne l'icon delete et on lui ajoute un click pour supprimer
    workElement.querySelector(".delete-icon").addEventListener("click", () => {
      deleteProject(work.id);
    });
    worksContainer.appendChild(workElement);
  });
}
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Fonction pour récupérer les œuvres depuis l'API
async function getWorksFromAPI() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des œuvres depuis l'API."
      );
    }
    works = await response.json();
    displayWorks(works); // Appel de la fonction pour afficher les œuvres
  } catch (error) {
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

// Vérifier si les champs sont remplis
const checkInputs = () => {
  // Récupérer les valeurs des champs
  const title = document.getElementById("titleInput").value.trim();
  const category = document.getElementById("categorySelect").value.trim();
  const imageInput = document.getElementById("imageInput").value.trim();
  // Vérifier si les valeurs sont vides
  if (title === "" || category === "" || imageInput.length === 0) {
    document.querySelector(".validateButton").classList.remove("active");
    return false;
  } else {
    document.querySelector(".validateButton").classList.add("active");
    return true;
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
  const input = document.getElementById("imageInput");
  const preview = document.getElementById("imagePreview");
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "100%";
      // Ajouter le style à l'image
      img.classList.add("custom-image-style");
      preview.appendChild(img);
      // Masquer les éléments lorsque l'image est affichée
      hideInputImage();
      // Afficher l'élément imagePreview
      preview.classList.remove("hide");
    };
    reader.readAsDataURL(file);
  }
}

// Fonction pour afficher l'input pour upload une image
function showInputImage() {
  document.querySelector(".file-label").classList.remove("hide");
  document.querySelector(".description").classList.remove("hide");
  document.querySelector(".custom-icon").classList.remove("hide");
}
// Fonction pour masquer l'input quand on a upload une image
function hideInputImage() {
  document.querySelector(".file-label").classList.add("hide");
  document.querySelector(".description").classList.add("hide");
  document.querySelector(".custom-icon").classList.add("hide");
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
  // on récupère les valeurs de chaque input
  const title = document.getElementById("titleInput").value;
  const category = document.getElementById("categorySelect").value;
  const imageInput = document.getElementById("imageInput");
  // on verifie si les champs sont bon
  if (!title || !category || imageInput.files.length === 0) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }
  const imageFile = imageInput.files[0];
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", imageFile);
  try {
    const authToken = localStorage.token;
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la requête POST. Veuillez vérifier vos informations d'authentification."
      );
    }
    const data = await response.json();
    // Ajoutez la nouvelle photo à la liste des projets
    works.push(data);

    displayWorks(works);
    chargerProjets();
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
