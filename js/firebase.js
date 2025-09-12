// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyDViFkkok1TPqfAoojDMQezPfe88WOyXnA",
  authDomain: "lovely-y5.firebaseapp.com",
  projectId: "lovely-y5",
  storageBucket: "lovely-y5.firebasestorage.app",
  messagingSenderId: "1092112874358",
  appId: "1:1092112874358:web:81a8de997a3d61dc94d857",
  measurementId: "G-RTNK2VTC0N"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias
const auth = firebase.auth();
const db = firebase.firestore();
