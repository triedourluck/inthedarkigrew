import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadSite() {
  const profile = await getDoc(doc(db, "site", "profile"));

  if (profile.exists()) {
    const data = profile.data();

    document.getElementById("name").textContent = data.name;
    document.getElementById("username").textContent = data.username;
    document.getElementById("description").textContent = data.description;

    if (data.avatarURL) {
      document.getElementById("avatar").src = data.avatarURL;
    }

    document.body.style.background = data.bgColor || "#f5f5f5";

    if (data.bgURL) {
      document.body.style.backgroundImage = `url(${data.bgURL})`;
    }

    if (data.fontFamily) {
      document.body.style.fontFamily = data.fontFamily;
    }
  }

  const posts = await getDocs(collection(db, "posts"));
  const container = document.getElementById("posts");

  posts.forEach(doc => {
    const post = doc.data();

    container.innerHTML += `
      <div class="post-box">
        <p>${post.text}</p>
        ${post.media ? `<img src="${post.media}" style="width:100%;">` : ""}
      </div>
    `;
  });
}

loadSite();