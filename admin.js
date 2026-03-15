import { db, storage } from "./firebase-config.js";
import {
  collection,
  addDoc,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

async function saveProfile() {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("messageLink").value;
  const avatarFile = document.getElementById("avatar").files[0];

  let avatarURL = "";

  if (avatarFile) {
    const storageRef = ref(storage, "avatar/" + avatarFile.name);
    await uploadBytes(storageRef, avatarFile);
    avatarURL = await getDownloadURL(storageRef);
  }

  await setDoc(doc(db, "profile", "main"), {
    name,
    username,
    description,
    link,
    avatar: avatarURL
  });
}

async function saveButton() {
  const text = document.getElementById("buttonText").value;
  const link = document.getElementById("buttonLink").value;

  await addDoc(collection(db, "buttons"), {
    text,
    link
  });
}

async function publishPost() {
  const text = document.getElementById("postText").value;
  const mediaFile = document.getElementById("media").files[0];

  let mediaURL = "";

  if (mediaFile) {
    const storageRef = ref(storage, "posts/" + mediaFile.name);
    await uploadBytes(storageRef, mediaFile);
    mediaURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
    text,
    media: mediaURL,
    createdAt: Date.now()
  });
}

window.saveProfile = saveProfile;
window.saveButton = saveButton;
window.publishPost = publishPost;