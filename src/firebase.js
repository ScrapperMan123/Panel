import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjZdnfVU6Gfd9mz_zeugFNBZqRBTvGbro",
  authDomain: "ayoub-81259.firebaseapp.com",
  databaseURL:
    "https://ayoub-81259-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ayoub-81259",
  storageBucket: "ayoub-81259.appspot.com",
  messagingSenderId: "559601261397",
  appId: "1:559601261397:web:a2e11c581866a4228b2ddc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
