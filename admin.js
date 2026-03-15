import { db, storage } from "./firebase-config.js";
import {
  doc,
  setDoc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

document.getElementById("save").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const description = document.getElementById("description").value;
  const buttonName = document.getElementById("buttonName").value;
  const buttonLink = document.getElementById("buttonLink").value;
  const postText = document.getElementById("postText").value;
  const bgColor = document.getElementById("bgColor").value;
  const fontFamily = document.getElementById("fontFamily").value;

  let avatarURL = "";
  let postURL = "";
  let bgURL = "";

  const avatarFile = document.getElementById("avatar").files[0];
  const postFile = document.getElementById("postFile").files[0];
  const bgFile = document.getElementById("bgImage").files[0];

  if (avatarFile) {
    const avatarRef = ref(storage, "avatar/" + avatarFile.name);
    await uploadBytes(avatarRef, avatarFile);
    avatarURL = await getDownloadURL(avatarRef);
  }

  if (postFile) {
    const postRef = ref(storage, "posts/" + postFile.name);
    await uploadBytes(postRef, postFile);
    postURL = await getDownloadURL(postRef);
  }

  if (bgFile) {
    const bgRef = ref(storage, "background/" + bgFile.name);
    await uploadBytes(bgRef, bgFile);
    bgURL = await getDownloadURL(bgRef);
  }

  await setDoc(doc(db, "site", "profile"), {
    name,
    username,
    description,
    avatarURL,
    buttonName,
    buttonLink,
    bgColor,
    bgURL,
    fontFamily
  });

  if (postText || postURL) {
    await addDoc(collection(db, "posts"), {
      text: postText,
      media: postURL,
      created: Date.now()
    });
  }

  alert("Saved");
});