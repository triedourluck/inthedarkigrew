import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsContainer = document.getElementById('posts');
const messagesContainer = document.getElementById('messages');

async function loadPosts() {
  const q = query(collection(db, "posts"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const post = doc.data();

    const div = document.createElement('div');
    div.className = 'post';

    div.innerHTML = `
      <p>${post.text}</p>
      ${post.image ? `<img src="${post.image}">` : ''}
    `;

    postsContainer.appendChild(div);
  });
}

async function loadMessages() {
  const snapshot = await getDocs(collection(db, "messages"));

  snapshot.forEach(doc => {
    const msg = doc.data();

    const div = document.createElement('div');
    div.className = 'message';

    div.innerHTML = `
      <p>${msg.text}</p>
      ${msg.reply ? `<small>${msg.reply}</small>` : ''}
    `;

    messagesContainer.appendChild(div);
  });
}

window.sendMessage = async function() {
  const text = document.getElementById('anonMessage').value;

  if (!text) return;

  await addDoc(collection(db, "messages"), {
    text,
    reply: ""
  });

  location.reload();
}

loadPosts();
loadMessages();
