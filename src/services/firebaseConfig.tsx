// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyD5bxH5KX_y93uxXzYE7JRfPIEKR3sxqDo",
  authDomain: "natureguard-d77f5.firebaseapp.com",
  projectId: "natureguard-d77f5",
  storageBucket: "natureguard-d77f5.appspot.com",
  messagingSenderId: "1014905614315",
  appId: "1:1014905614315:web:dee91416adc9ced53e33ae",
  measurementId: "G-QP79ET8WD3"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);