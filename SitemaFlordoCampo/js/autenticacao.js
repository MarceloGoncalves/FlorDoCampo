//butões
let btnEntrar = document.getElementById('btnEntrar');
let btnNovaConta = document.getElementById('btnNovaConta');
let autenticarGoogle = document.getElementById('autenticarGoogle');
let autenticarFacebook = document.getElementById('autenticarFacebook');

//Entradas
let inputNome = document.getElementById('inputNome');
let inputEmail = document.getElementById('inputEmail');
let inputSenha = document.getElementById('inputSenha');

//Adicionar user no banco de dados
function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
  });
}

//Criar um Novo usuário
btnNovaConta.addEventListener('click', function(){

    firebase
    .auth()
    .createUserWithEmailAndPassword(inputEmail.value, inputSenha.value)
    .then(function(){
      alert("Bem vindo " + inputNome.value);
       //salvanoBanco
       //writeUserData(0,inputNome.value, inputEmail.value)
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        console.log(errorCode);
        console.log(errorMessage);
        alert("Erro ao logar");
        
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  });

  //Autenticar com e-mail
btnEntrar.addEventListener('click', function(){

  firebase
  .auth()
  .signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
  .then(function(){
    alert("Bem vindo " + inputEmail.value);
  })
  .catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      console.log(errorCode);
      console.log(errorMessage);
      alert("Erro ao logar");
      
    }
    console.log(error);
    // [END_EXCLUDE]
  });
});

//Observador
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      console.log(displayName);
      // ...
    } else {
      // User is signed out.
      // ...
    }
});

autenticarGoogle.addEventListener('click', function(){
  let provider = new firebase.auth.GoogleAuthProvider();
  singIn(provider);
});

function singIn(provider){
  firebase.auth()
  .signInWithPopup(provider)
  .then(function (result){
    console.log(result);
    let token = result.credential.accessToken;
    alert("Bem Vindo " + result.user.displayName);
  }).catch(function (error){
    console.log(error);
    alert('falha na autenticação');
  });
}

let database = firebase.database();
