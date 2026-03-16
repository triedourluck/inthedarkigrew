import { db } from "./firebase-config.js";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadSite() {

  const profileSnap = await getDoc(doc(db, "profile", "main"));

  if (profileSnap.exists()) {
    const data = profileSnap.data();

    document.getElementById("profileName").textContent = data.name || "your name";
    document.getElementById("profileUsername").textContent = data.username || "@username";
    document.getElementById("profileDescription").textContent = data.description || "";

    if (data.avatarURL) {
      document.getElementById("avatar").src = data.avatarURL;
    }

    if (data.buttonLink) {
      document.getElementById("messageLink").href = data.buttonLink;
    }
  }

  const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const postsSnap = await getDocs(postsQuery);

  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  postsSnap.forEach(docItem => {
    const post = docItem.data();

    const div = document.createElement("div");
    div.className = "post-box";

    let imagesHTML = "";

    if (post.images && post.images.length > 0) {
      imagesHTML = post.images.map(url => `<img src="${url}">`).join("");
    }

    let tagHTML = "";

    if (post.tag) {
      tagHTML = `<p>#${post.tag}</p>`;
    }

    div.innerHTML = `
      <p>${post.text || ""}</p>
      ${imagesHTML}
      ${tagHTML}
    `;

    postsContainer.appendChild(div);
  });
}

loadSite();