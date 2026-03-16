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

const saveProfile = document.getElementById("saveProfile");
const publishPost = document.getElementById("publishPost");
const postsContainer = document.getElementById("adminPosts");

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

  alert("Saved");

});

publishPost.addEventListener("click", async () => {

  const text = document.getElementById("postText").value;

  if (!text) {
    alert("write something first");
    return;
  }

  await addDoc(collection(db, "posts"), {
    text,
    createdAt: serverTimestamp()
  });

  alert("Post published");

  loadPosts();

});

async function loadPosts() {

  postsContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((docSnap) => {

    const post = docSnap.data();

    const div = document.createElement("div");
    div.innerHTML = `<p>${post.text}</p>`;

    postsContainer.appendChild(div);

  });

}

loadPosts();