import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB3OTChbWWpfaOrmsYTIUxJEVgT9ZeIFas",
  authDomain: "shop-e399c.firebaseapp.com",
  projectId: "shop-e399c",
  storageBucket: "shop-e399c.appspot.com",
  messagingSenderId: "407182759726",
  appId: "1:407182759726:web:546b275331382db19a0cbf",
  measurementId: "G-378TX59YY6"
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