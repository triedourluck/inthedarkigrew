import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxT8Yoq7wwEFZ3236DzoIvAw0twfboTtc",
  authDomain: "thequietclub.firebaseapp.com",
  projectId: "thequietclub",
  storageBucket: "thequietclub.firebasestorage.app",
  messagingSenderId: "761080369460",
  appId: "1:761080369460:web:567825de5b83bea5465561"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {

  // PROFILE

  const saveProfile = document.getElementById("saveProfile");

  saveProfile.addEventListener("click", async () => {

    const name = document.getElementById("nameInput").value;
    const username = document.getElementById("usernameInput").value;
    const description = document.getElementById("descriptionInput").value;
    const messageLink = document.getElementById("messageLinkInput").value;

    await setDoc(doc(db, "profile", "main"), {
      name,
      username,
      description,
      messageLink
    });

    alert("Profile saved ✅");

  });

  // POSTS

  const publishPost = document.getElementById("publishPost");

  publishPost.addEventListener("click", async () => {

    const text = document.getElementById("postText").value;

    if (!text) return;

    await addDoc(collection(db, "posts"), {
      text,
      createdAt: serverTimestamp()
    });

    document.getElementById("postText").value = "";

    alert("Post published ✅");

  });

});