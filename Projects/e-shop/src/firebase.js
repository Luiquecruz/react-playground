import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3p-YwaNZ0WYSgT39lyvFx5eK4J4G73X4",
  authDomain: "e-shop-d52a6.firebaseapp.com",
  projectId: "e-shop-d52a6",
  storageBucket: "e-shop-d52a6.appspot.com",
  messagingSenderId: "63737105792",
  appId: "1:63737105792:web:641bcddcd71e6916304565",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };