// Déclarez la fonction closeModal dans le contexte global
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}




document.addEventListener("DOMContentLoaded", function() {
    // Récupère la référence de la modal
    const modal = document.getElementById("myModal");

    // Assurez-vous que la modal n'est pas affichée au démarrage
    modal.style.display = "none";

    // Récupère la référence de l'élément qui contiendra les œuvres
    const worksContainer = document.getElementById("worksContainer");

    // Fonction pour ouvrir la modal
    function openModal() {
        modal.style.display = "block";
        displayWorks();
    }

    // Obtenez le span de modification et ajoutez un écouteur d'événements de clic
    const modifierSpan = document.querySelector(".modifier");
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
    const workElement = document.createElement("div");
    workElement.innerHTML = `
        <div style="display: flex; justify-content: flex-end;">
            <img src="${work.imageUrl}" alt="${work.title}" style="width: 78.12px; height: 104.08px;">
            <div class="delete-icon" style="margin-left: -15px;z-index:999">
                <i class="fas fa-trash"></i>
            </div>
        </div>
        <!-- Ajoutez d'autres détails de l'œuvre ici -->
    `;
    worksContainer.appendChild(workElement);
});

}

// Appel de la fonction pour afficher les œuvres lors de l'ouverture de la modal
openModal();


// -------------------------------------------------------------------------------------------




// Fonction pour ouvrir la modal
function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // Afficher les éléments
    showElements();
}












// Fonction pour fermer la modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    // Réinitialiser le champ d'entrée pour permettre une nouvelle sélection
    document.getElementById('imageInput').value = '';

    // Masquer les éléments
    hideElements();

    // Masquer l'élément imagePreview
    document.getElementById('imagePreview').classList.add('hide');
}











// Fonction pour afficher l'image sélectionnée
function displayImage() {
    const input = document.getElementById('imageInput');
    const preview = document.getElementById('imagePreview');

    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100%';

            // Ajouter le style à l'image
            img.classList.add('custom-image-style');

            preview.appendChild(img);

            // Masquer les éléments lorsque l'image est affichée
            hideElements();

            // Afficher l'élément imagePreview
            preview.classList.remove('hide');
        };

        reader.readAsDataURL(file);
    }
}







// Fonction pour afficher les éléments
function showElements() {
    document.querySelector('.file-label').classList.remove('hide');
    document.querySelector('.description').classList.remove('hide');
    document.querySelector('.custom-icon').classList.remove('hide');
}

// Fonction pour masquer les éléments
function hideElements() {
    document.querySelector('.file-label').classList.add('hide');
    document.querySelector('.description').classList.add('hide');
    document.querySelector('.custom-icon').classList.add('hide');
}

function openAddPhotoModal() {
    const addPhotoModal = document.getElementById('addPhotoModal');
    addPhotoModal.style.display = 'block';
    // Afficher les éléments
    showElements();
}

// Fonction pour retourner à la modal principale
function goBack() {
    var addPhotoModal = document.getElementById('addPhotoModal');
    addPhotoModal.style.display = 'none';
    // Réinitialiser le champ d'entrée pour permettre une nouvelle sélection
    document.getElementById('imageInput').value = '';
    // Masquer les éléments
    hideElements();
    // Masquer l'élément imagePreview
    document.getElementById('imagePreview').classList.add('hide');
    // Afficher la modal principale
    openModal();
}
function closeAddPhotoModal() {
    const addPhotoModal = document.getElementById('addPhotoModal');
    addPhotoModal.style.display = 'none';

    // Ensuite, ouvrir la modal principale
    openModal();
}
// ------------------------------------------------------------------------------------------















async function validatePhoto() {
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('categorySelect').value;
    const imageInput = document.getElementById('imageInput');

    if (!title || !category || imageInput.files.length === 0) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    const imageFile = imageInput.files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
        const authToken = "votre-jeton-d-authentification"; // Remplacez par votre véritable jeton d'authentification
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + authToken,
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la requête POST. Veuillez vérifier vos informations d\'authentification.');
        }

        const data = await response.json();

        // Assuming addNewPhotoToGallery and closeAddPhotoModal are defined elsewhere
        addNewPhotoToGallery(data);

        // Close the modal after successful upload
        closeAddPhotoModal();
    } catch (error) {
        console.error('Erreur lors de la requête POST:', error.message);
    }
}

fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: formData
})
.then(response => response.json())
.then(data => {
    // ...
})
.catch(error => {
    console.error('Erreur lors de la requête POST:', error);
});
