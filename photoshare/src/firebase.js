import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA2xcBiQFzp9KDBBkpxBMUoi78CMgnBDwU",
  authDomain: "photoshare-dm2518.firebaseapp.com",
  databaseURL: "https://photoshare-dm2518.firebaseio.com",
  projectId: "photoshare-dm2518",
  storageBucket: "photoshare-dm2518.appspot.com",
  messagingSenderId: "964914163035",
  appId: "1:964914163035:web:38aa6c407503cdc5"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

export default firebase;
