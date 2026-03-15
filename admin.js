import { db, storage } from "./firebase-config.js";
import {
  doc,
  setDoc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

document.getElementById("saveProfile").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const description = document.getElementById("description").value;

  let avatarURL = "";

  const avatarFile = document.getElementById("avatar").files[0];

  if (avatarFile) {
    const avatarRef = ref(storage, "avatar/" + avatarFile.name);
    await uploadBytes(avatarRef, avatarFile);
    avatarURL = await getDownloadURL(avatarRef);
  }

  await setDoc(doc(db, "site", "profile"), {
    name,
    username,
    description,
    avatarURL
  }, { merge: true });

  alert("Profile saved");
});

document.getElementById("saveLinks").addEventListener("click", async () => {
  const buttonName = document.getElementById("buttonName").value;
  const buttonLink = document.getElementById("buttonLink").value;

  await setDoc(doc(db, "site", "links"), {
    buttonName,
    buttonLink
  }, { merge: true });

  alert("Links saved");
});

document.getElementById("postButton").addEventListener("click", async () => {
  const postText = document.getElementById("postText").value;

  let mediaURL = "";

  const file = document.getElementById("postFile").files[0];

  if (file) {
    const postRef = ref(storage, "posts/" + file.name);
    await uploadBytes(postRef, file);
    mediaURL = await getDownloadURL(postRef);
  }

  await addDoc(collection(db, "posts"), {
    text: postText,
    media: mediaURL,
    created: Date.now()
  });

  alert("Posted");
});

document.getElementById("saveAppearance").addEventListener("click", async () => {
  const bgColor = document.getElementById("bgColor").value;
  const fontFamily = document.getElementById("fontFamily").value;

  let bgURL = "";

  const bgFile = document.getElementById("bgImage").files[0];

  if (bgFile) {
    const bgRef = ref(storage, "background/" + bgFile.name);
    await uploadBytes(bgRef, bgFile);
    bgURL = await getDownloadURL(bgRef);
  }

  await setDoc(doc(db, "site", "appearance"), {
    bgColor,
    bgURL,
    fontFamily
  }, { merge: true });

  alert("Appearance saved");
});