import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxT8Yoq7wwEFZ3236DzoIvAw0twfboTtc",
  authDomain: "inthedarkigrew-29bf8.firebaseapp.com",
  projectId: "inthedarkigrew-29bf8",
  storageBucket: "inthedarkigrew-29bf8.firebasestorage.app",
  messagingSenderId: "761080369460",
  appId: "1:761080369460:web:567825de5b83bea5465561"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);