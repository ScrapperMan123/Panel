import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { dbs } from "./configs";

// TODO: Replace the following with your app's Firebase project configuration
const reference = {
  apiKey: "AIzaSyAKIDuxgLUTjcg9r0Lsu5ZLpPT9OQvlArA",
  authDomain: "ayoub-cbe10.firebaseapp.com",
  projectId: "ayoub-cbe10",
  storageBucket: "ayoub-cbe10.appspot.com",
  messagingSenderId: "341475894389",
  appId: "1:341475894389:web:abf6b7a117306f714d043c",
};

export const referenceDB = getFirestore(initializeApp(reference, "switcher"));

const names = Object.keys(dbs);

const dbsApps = names.map((name) => initializeApp(dbs[name], name));
