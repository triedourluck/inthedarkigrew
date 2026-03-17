import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmlJ4vXMDFka22-tSv9QVUoo2CEJ85LgU",
  authDomain: "thequietclub-7265a.firebaseapp.com",
  projectId: "thequietclub-7265a",
  storageBucket: "thequietclub-7265a.firebasestorage.app",
  messagingSenderId: "144237272532",
  appId: "1:144237272532:web:6478b66adf2b2e76fdca41"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);