import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadSite() {

  // PROFILE
  const profileSnap = await getDoc(doc(db, "site", "profile"));

  if (profileSnap.exists()) {
    const profile = profileSnap.data();

    if (profile.name) {
      document.getElementById("name").textContent = profile.name;
    }

    if (profile.username) {
      document.getElementById("username").textContent = profile.username;
    }

    if (profile.description) {
      document.getElementById("description").textContent = profile.description;
    }

    if (profile.avatarURL) {
      document.getElementById("avatar").src = profile.avatarURL;
    }
  }

  // LINKS
  const linksSnap = await getDoc(doc(db, "site", "links"));

  if (linksSnap.exists()) {
    const links = linksSnap.data();

    const linksContainer = document.getElementById("extra-links");

    if (links.buttonName && links.buttonLink && linksContainer) {
      linksContainer.innerHTML = `
        <a href="${links.buttonLink}" target="_blank">${links.buttonName}</a>
      `;
    }
  }

  // APPEARANCE
  const appearanceSnap = await getDoc(doc(db, "site", "appearance"));

  if (appearanceSnap.exists()) {
    const appearance = appearanceSnap.data();

    if (appearance.bgColor) {
      document.body.style.backgroundColor = appearance.bgColor;
    }

    if (appearance.bgURL) {
      document.body.style.backgroundImage = `url(${appearance.bgURL})`;
      document.body.style.backgroundSize = "cover";
    }

    if (appearance.fontFamily) {
      document.body.style.fontFamily = appearance.fontFamily;
    }
  }

  // POSTS
  const postsSnap = await getDocs(collection(db, "posts"));

  const postsContainer = document.getElementById("posts");

  if (postsContainer) {
    postsContainer.innerHTML = "";

    postsSnap.forEach(docItem => {
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
}

loadSite();