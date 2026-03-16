alert("admin js loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
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

  const saveProfile = document.getElementById("saveProfile");
  const publishPost = document.getElementById("publishPost");
  const postsContainer = document.getElementById("adminPosts");

  if(saveProfile){

    saveProfile.addEventListener("click", async () => {

      try{

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

        alert("Saved profile ✅");

      }catch(error){
        console.error(error);
        alert("Firebase profile error");
      }

    });

  }

  if(publishPost){

    publishPost.addEventListener("click", async () => {

      try{

        const text = document.getElementById("postText").value;

        if(!text){
          alert("write something first");
          return;
        }

        await addDoc(collection(db, "posts"), {
          text,
          createdAt: serverTimestamp()
        });

        alert("Post published ✅");

        loadPosts();

      }catch(error){
        console.error(error);
        alert("Firebase post error");
      }

    });

  }

  async function loadPosts(){

    if(!postsContainer) return;

    postsContainer.innerHTML = "";

    try{

      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((docSnap) => {

        const post = docSnap.data();

        const div = document.createElement("div");
        div.className = "admin-post";
        div.innerHTML = `<p>${post.text}</p>`;

        postsContainer.appendChild(div);

      });

    }catch(error){
      console.error(error);
    }

  }

  loadPosts();

});