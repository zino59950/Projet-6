// Événement de soumission du formulaire
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche la soumission du formulaire


  // Récupération des valeurs saisies par l'utilisateur
  const email = emailInput.value;
  const password = passwordInput.value;

  // Vous pouvez maintenant effectuer une validation côté client ici
  // Par exemple, vérifier si les champs ne sont pas vides
  if (!email || !password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  // Envoi des données d'authentification à l'API
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        // Authentification réussie : rediriger l'utilisateur vers la page d'accueil
        window.location.href = 'index.html';
        localStorage.token = data.token;
      } else {
        // Authentification échouée : afficher un message d'erreur
        alert('Échec de la connexion. Veuillez vérifier vos informations.');
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'authentification :', error);
      alert('Une erreur est survenue lors de l\'authentification.');
    });
});

// Récupération des éléments du formulaire
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pass');

// Lien "Mot de passe oublié"
const forgotPasswordLink = document.querySelector('.mp-forget');
forgotPasswordLink.addEventListener('click', function (event) {
  event.preventDefault();
  alert('Lien de réinitialisation du mot de passe envoyé par e-mail.');
});

//-----------------------------------------------------------------------------------

