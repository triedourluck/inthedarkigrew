const saveProfile = document.getElementById("saveProfile");

const nameInput = document.getElementById("nameInput");
const usernameInput = document.getElementById("usernameInput");
const descriptionInput = document.getElementById("descriptionInput");
const avatarInput = document.getElementById("avatarInput");
const messageLinkInput = document.getElementById("messageLinkInput");

saveProfile.addEventListener("click", () => {

    localStorage.setItem("name", nameInput.value);
    localStorage.setItem("username", usernameInput.value);
    localStorage.setItem("description", descriptionInput.value);
    localStorage.setItem("messageLink", messageLinkInput.value);

    const file = avatarInput.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = function(e){
            localStorage.setItem("avatar", e.target.result);
        }

        reader.readAsDataURL(file);
    }

});

const publishBtn = document.getElementById("publishPost");
const postText = document.getElementById("postText");
const postFile = document.getElementById("postFile");
const adminPosts = document.getElementById("adminPosts");

let posts = [];

publishBtn.addEventListener("click", () => {

    const text = postText.value;
    const file = postFile.files[0];

    const post = {
        text,
        fileURL: file ? URL.createObjectURL(file) : null,
        fileType: file ? file.type : null
    };

    posts.unshift(post);

    renderPosts();

    postText.value = "";
    postFile.value = "";
});

function renderPosts(){

    adminPosts.innerHTML = "";

    posts.forEach((post,index)=>{

        const div = document.createElement("div");

        div.className = "admin-post";

        let media = "";

        if(post.fileURL){

            if(post.fileType.startsWith("image")){
                media = `<img src="${post.fileURL}">`;
            }

            if(post.fileType.startsWith("video")){
                media = `<video controls src="${post.fileURL}"></video>`;
            }

        }

        div.innerHTML = `
            <p>${post.text}</p>
            ${media}
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;

        adminPosts.appendChild(div);

    });

}

window.deletePost = function(index){
    posts.splice(index,1);
    renderPosts();
}