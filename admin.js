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
    const files = Array.from(postFile.files);

    const media = files.map(file => ({
        url: URL.createObjectURL(file),
        type: file.type
    }));

    const post = {
        text,
        media
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

        let mediaHTML = "";

        if(post.media.length > 0){

            mediaHTML = `<div class="media-grid">`;

            post.media.forEach(item => {

                if(item.type.startsWith("image")){
                    mediaHTML += `<img src="${item.url}">`;
                }

                if(item.type.startsWith("video")){
                    mediaHTML += `<video controls src="${item.url}"></video>`;
                }

            });

            mediaHTML += `</div>`;
        }

        div.innerHTML = `
            <p>${post.text}</p>
            ${mediaHTML}
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;

        adminPosts.appendChild(div);

    });

}

window.deletePost = function(index){
    posts.splice(index,1);
    renderPosts();
}