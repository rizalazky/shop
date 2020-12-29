import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA0I16Yrow0XaZo0JlY8l8mcGrFZHBfHzM",
  authDomain: "klik-dokter-shop.firebaseapp.com",
  projectId: "klik-dokter-shop",
  storageBucket: "klik-dokter-shop.appspot.com",
  messagingSenderId: "1439585252",
  appId: "1:1439585252:web:c174f557c8496eeb8fedf1",
  measurementId: "G-DZDRLSCMJR"
};

firebase.initializeApp(firebaseConfig)

const db=firebase.firestore()
const auth=firebase.auth()
const storage=firebase.storage()

export {
	db,
	auth,
	storage
};