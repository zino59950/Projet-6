// Récupération des éléments du formulaire
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pass');

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

// Effectue une requête HTTP POST vers l'API de login des utilisateurs
fetch('http://localhost:5678/api/users/login', {
  // Spécifie la méthode de la requête comme étant POST
  method: 'POST', 
  // La méthode HTTP POST est utilisée pour envoyer des données au serveur en vue de créer une nouvelle ressource
  // Définit les en-têtes de la requête, indiquant que le serveur doit répondre au format JSON
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // Convertit les données de login (email et mot de passe) 
  // en format JSON et les envoie dans le corps de la requête
  body: JSON.stringify({
    email: email,
    password: password
  })
})

  .then(response => response.json()) // convertie la réponse HTTP en JSON
  .then(data => {//pour manipuler les donnée récupérer du serveur
    console.log(data);
    if (data.token) { 
      // Cette condition est vérifiée si un jeton (token) est présent dans les données
      localStorage.setItem("token", data.token);
      // Authentification réussie : rediriger l'utilisateur vers la page d'accueil
      window.location.href = 'index.html';
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

// Lien "Mot de passe oublié"
const forgotPasswordLink = document.querySelector('.mp-forget');
forgotPasswordLink.addEventListener('click', function (event) {
  event.preventDefault();
  alert('Lien de réinitialisation du mot de passe envoyé par e-mail.');
});
