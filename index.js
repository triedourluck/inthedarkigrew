import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadSite() {
  const profileSnap = await getDoc(doc(db, "site", "profile"));

  if (profileSnap.exists()) {
    const data = profileSnap.data();

    if (data.name) {
      document.getElementById("name").textContent = data.name;
    }

    if (data.username) {
      document.getElementById("username").textContent = data.username;
    }

    if (data.description) {
      document.getElementById("description").textContent = data.description;
    }

    if (data.avatarURL) {
      document.getElementById("avatar").src = data.avatarURL;
    }

    if (data.buttonName && data.buttonLink) {
      document.getElementById("extra-links").innerHTML = `
        <a href="${data.buttonLink}" target="_blank">${data.buttonName}</a>
      `;
    }

    if (data.bgColor) {
      document.body.style.backgroundColor = data.bgColor;
    }

    if (data.bgURL) {
      document.body.style.backgroundImage = `url(${data.bgURL})`;
      document.body.style.backgroundSize = "cover";
    }

    if (data.fontFamily) {
      document.body.style.fontFamily = data.fontFamily;
    }
  }

  const postsSnap = await getDocs(collection(db, "posts"));
  const postsContainer = document.getElementById("posts");

  postsContainer.innerHTML = "";

  postsSnap.forEach((docItem) => {
    const post = docItem.data();

    const div = document.createElement("div");
    div.className = "post-box";

    div.innerHTML = `
      <p>${post.text || ""}</p>
      ${post.media ? `<img src="${post.media}" style="width:100%; margin-top:10px;">` : ""}
    `;

    postsContainer.appendChild(div);
  });
}

loadSite();