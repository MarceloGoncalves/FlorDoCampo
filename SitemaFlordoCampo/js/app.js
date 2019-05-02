// Initialize Firebase
  let config = {
    apiKey: "AIzaSyAacPPbC2o7e3W2uLO64GAPecRS1xwnRHw",
    authDomain: "prototipo-projeto2.firebaseapp.com",
    databaseURL: "https://prototipo-projeto2.firebaseio.com",
    projectId: "prototipo-projeto2",
    storageBucket: "prototipo-projeto2.appspot.com",
    messagingSenderId: "20829331468"
  };
  firebase.initializeApp(config, {
    timestampsInSnapshots:true
  });

  const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);