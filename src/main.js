import { getData } from "./js/data.js";
import { getCommentComponent, renderComment, getRepliesComponent } from "./js/comments.js";
import { showTextArea, getTextareaComponent } from "./js/textArea.js";



const mainContainer = document.querySelector("#main");
let mql = window.matchMedia('(min-width: 1024px)');

async function initializeComments() {

    const data = await getData();
    const commentTemplate = await getCommentComponent();
    const replyTemplate = await getRepliesComponent();
    const textAreaTemplate = await getTextareaComponent();
    const currentUser = data.currentUser;

    const comments = data.comments;

    comments.forEach((comment) => {
        const commentElement = renderComment(comment, commentTemplate, replyTemplate, currentUser);
        mainContainer.appendChild(commentElement);
    });

    const textAreaElement = showTextArea(textAreaTemplate, currentUser);
    mainContainer.appendChild(textAreaElement);

}


window.onload = initializeComments;


/* import { getData } from "./js/getData.js";
import { getCommentComponent } from "./js/getComponents.js";
import { icon } from "./js/icon.js";
import { showReplies } from "./js/showReplies.js";
import { findCurrentUser } from "./js/findCurrentUser.js";
import { showTextArea } from "./js/showTextArea.js";


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

    comments.forEach((comment, i) => { */
/* set components id */
// components[i].id = `commentComponent${i}`;

/* charge data  header */
/*     const commentHeader = components[i].querySelector(".comment-header");
    const avatar = commentHeader.querySelector(".avatar");
    const username = commentHeader.querySelector(".username");
    const submitted = commentHeader.querySelector(".submitted"); */

/* charge data content */
/* const contentArea = components[i].querySelector(".comment-body");
const content = contentArea.querySelector(".comment-text"); */

/* chargue footer data */
/*  const footerArea = components[i].querySelector(".comment-footer");
 const score = footerArea.querySelector(".score");

 const replyButton = footerArea.querySelector(".btn-replyButton");
 const iconContainer = replyButton.firstElementChild;
 const replyIcon = icon.filter((item) => item.name === "reply")[0];

 replyButton.id = `replyButton${i}`
 avatar.src = comment.user.image.png;
 username.innerText = comment.user.username;
 submitted.innerText = comment.createdAt;
 content.innerText = comment.content;
 score.innerText = comment.score;
 iconContainer.innerHTML += replyIcon.svg; */

/* charge replies if it has */
/*         if (comment.replies.length !== 0) {
            showReplies(comment, components[i]);
        }

    });

    findCurrentUser(comments, currentUser);

   

}
 */
/* const callEvents = async () => {
    const repliesButtons = main.querySelectorAll(".btn-replyButton");

    repliesButtons.forEach((button, i) => {
        button.addEventListener('click', showTextArea(event));
    });
}
 */











