import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs
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

async function loadProfile() {

  const profileRef = doc(db, "profile", "main");
  const profileSnap = await getDoc(profileRef);

  if (profileSnap.exists()) {

    const data = profileSnap.data();

    document.getElementById("profileName").textContent = data.name || "your name";
    document.getElementById("profileUsername").textContent = data.username || "@username";
    document.getElementById("profileDescription").textContent = data.description || "your description here";

    if (data.messageLink) {
      document.getElementById("messageLink").href = data.messageLink;
    }

  }

}

async function loadPosts() {

  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((docItem) => {

    const data = docItem.data();

    const post = document.createElement("div");
    post.className = "post-card";

    post.innerHTML = `
      <p>${data.text}</p>
    `;

    postsContainer.appendChild(post);

  });

}

loadProfile();
loadPosts();