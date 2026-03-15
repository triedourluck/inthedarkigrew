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

    document.getElementById("name").textContent = data.name || "your name";
    document.getElementById("username").textContent = data.username || "@username";
    document.getElementById("description").textContent = data.description || "";

    if (data.avatarURL) {
      document.getElementById("avatar").src = data.avatarURL;
    }

    if (data.buttonName && data.buttonLink) {
      document.getElementById("extra-links").innerHTML = `
        <a href="${data.buttonLink}" target="_blank">${data.buttonName}</a>
      `;
    }
  }

  const postsSnap = await getDocs(collection(db, "posts"));
  const postsContainer = document.getElementById("posts");

  postsContainer.innerHTML = "";

  postsSnap.forEach(docItem => {
    const post = docItem.data();

    const div = document.createElement("div");
    div.className = "post-box";

    let media = "";

    if (post.media) {
      media = `<img src="${post.media}">`;
    }

    div.innerHTML = `
      <p>${post.text || ""}</p>
      ${media}
    `;

    postsContainer.appendChild(div);
  });
}

loadSite();