import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getFirestore,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxT8Yoq7wwEFZ3236DzoIvAw0twfboTtc",
  authDomain: "thequietclub.firebaseapp.com",
  projectId: "thequietclub",
  storageBucket: "thequietclub.firebasestorage.app",
  messagingSenderId: "761080369460",
  appId: "1:761080369460:web:567825de5b83bea5465561"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const saveProfile = document.getElementById("saveProfile");

saveProfile.addEventListener("click", async () => {

    const name = document.getElementById("nameInput").value;
    const username = document.getElementById("usernameInput").value;
    const description = document.getElementById("descriptionInput").value;
    const messageLink = document.getElementById("messageLinkInput").value;

    try {

        await setDoc(doc(db, "profile", "main"), {
            name,
            username,
            description,
            messageLink
        });

        alert("Saved to Firebase");

    } catch(error) {

        console.error(error);
        alert("Error saving");

    }

});