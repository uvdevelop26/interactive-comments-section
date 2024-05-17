import { getData } from "./js/getData.js";
import { getCommentComponent } from "./js/getComponents.js";
import { icon } from "./js/icon.js";
import { showReplies } from "./js/showReplies.js";
import { findCurrentUser } from "./js/findCurrentUser.js";



window.onload = chargeInterface;

const main = document.querySelector("#main");

async function chargeInterface() {
    const data = await getData();
    const CommentComponent = await getCommentComponent();
    
    const comments = data.comments;
    const currentUser = data.currentUser;

    for (let i = 0; i < comments.length; i++) {
        main.innerHTML += CommentComponent;
    }

    const components = main.querySelectorAll(".comment-section");

    comments.forEach((comment, i) => {
        /* set components id */
        components[i].id = `commentComponent${i}`;

        /* charge data  header */
        const commentHeader = components[i].querySelector(".comment-header");
        const avatar = commentHeader.querySelector(".avatar");
        const username = commentHeader.querySelector(".username");
        const submitted = commentHeader.querySelector(".submitted");

        /* charge data content */
        const contentArea = components[i].querySelector(".comment-body");
        const content = contentArea.querySelector(".comment-text");

        /* chargue footer data */
        const footerArea = components[i].querySelector(".comment-footer");
        const score = footerArea.querySelector(".score");

        const replyButton = footerArea.querySelector(".btn-replyButton");
        const iconContainer = replyButton.firstElementChild;
        const replyIcon = icon.filter((item) => item.name === "reply")[0];

        avatar.src = comment.user.image.png;
        username.innerText = comment.user.username;
        submitted.innerText = comment.createdAt;
        content.innerText = comment.content;
        score.innerText = comment.score;
        iconContainer.innerHTML += replyIcon.svg;

        /* charge replies if it has */
        if (comment.replies.length !== 0) {
            showReplies(comment, components[i]);
        }

    });

    findCurrentUser(comments, currentUser); 

}


