import { db } from './firebase-config.js';
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.publishPost = async function() {
  const text = document.getElementById('postText').value;
  const image = document.getElementById('imageUrl').value;

  await addDoc(collection(db, "posts"), {
    text,
    image
  });

  alert("Publicado");
}
