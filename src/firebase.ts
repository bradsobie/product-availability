import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBhWfPD2n4uuD_cHbASZJQncDY1RQOBKpM",
  authDomain: "product-availability-48a1a.firebaseapp.com",
  databaseURL: "https://product-availability-48a1a.firebaseio.com",
  projectId: "product-availability-48a1a",
  storageBucket: "product-availability-48a1a.appspot.com",
  messagingSenderId: "985423605843",
  appId: "1:985423605843:web:918729485dff87aafcd6a6",
  measurementId: "G-CQKX7KWCMN"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase;
