import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCg9jZGJpi82x7_ZSKs7trWyh2ge6PHn-k",
  authDomain: "eduauth-72983.firebaseapp.com",
  projectId: "eduauth-72983",
  storageBucket: "eduauth-72983.appspot.com",
  messagingSenderId: "526188916173",
  appId: "1:526188916173:web:b3c6a04678531e87e16884",
  measurementId: "G-JJEFCQH4RH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
