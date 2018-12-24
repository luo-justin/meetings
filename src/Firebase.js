 import firebase from 'firebase/app';
 import 'firebase/database';
 import 'firebase/auth'

 const config = {
    apiKey: "AIzaSyC6A3n4OZQIeDsrlumHSbvt9Qrb3baNHqA",
    authDomain: "meetings-77930.firebaseapp.com",
    databaseURL: "https://meetings-77930.firebaseio.com",
    projectId: "meetings-77930",
    storageBucket: "",
    messagingSenderId: "644775120620"
  };

  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;