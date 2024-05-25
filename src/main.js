import { getData } from "./js/data.js";
import { getCommentComponent, renderComment, getRepliesComponent } from "./js/comments.js";
import { showTextArea, getTextareaComponent } from "./js/textArea.js";

const mainContainer = document.querySelector("#main");



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










