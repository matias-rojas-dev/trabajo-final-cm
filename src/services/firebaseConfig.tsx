import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5bxH5KX_y93uxXzYE7JRfPIEKR3sxqDo",
  authDomain: "natureguard-d77f5.firebaseapp.com",
  projectId: "natureguard-d77f5",
  storageBucket: "natureguard-d77f5.appspot.com",
  messagingSenderId: "1014905614315",
  appId: "1:1014905614315:web:dee91416adc9ced53e33ae",
  measurementId: "G-QP79ET8WD3",
  databaseURL: "https://natureguard-d77f5-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, firestore, database };