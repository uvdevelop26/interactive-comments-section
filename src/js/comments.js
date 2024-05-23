import { icon } from "./icon.js";

async function getCommentComponent() {
    try {
        const data = await fetch("./src/partials/Comments.html");

        if (!data.ok) {
            throw Error("error in component Comments.html")
        }

        const response = data.text();

        return response;

    } catch (error) {
        console.log(error.message)
    }
}

const getRepliesComponent = async () => {
    try {
        const data = await fetch("./src/partials/Replies.html");

        if (!data.ok) {
            throw Error("error in component Replies.html")
        }

        const response = data.text();

        return response;

    } catch (error) {
        console.log(error.message)
    }
}

function renderComment(commentData, commentTemplate, replyTemplate, currentUser) {

    const commentSection = document.createElement("section");
    commentSection.classList.add("comment-section");

    commentSection.innerHTML = commentTemplate;

    /* charge data  header */
    const commentHeader = commentSection.querySelector(".comment-header");
    const avatar = commentHeader.querySelector(".avatar");
    const username = commentHeader.querySelector(".username");
    const submitted = commentHeader.querySelector(".submitted");

    /* charge data content */
    const contentArea = commentSection.querySelector(".comment-body");
    const content = contentArea.querySelector(".comment-text");

    /* chargue footer data */
    const footerArea = commentSection.querySelector(".comment-footer");
    const score = footerArea.querySelector(".score");
    const replyButton = footerArea.querySelector(".btn-replyButton");
    const iconContainer = replyButton.firstElementChild;
    const replyIcon = icon.filter((item) => item.name === "reply")[0];

    avatar.src = commentData.user.image.png;
    username.innerText = commentData.user.username;
    submitted.innerText = commentData.createdAt;
    content.innerText = commentData.content;
    score.innerText = commentData.score;
    iconContainer.innerHTML += replyIcon.svg;

    /* chargue replies */

    const repliesSection = commentSection.querySelector(".comment-container").nextElementSibling;

    if (commentData.replies && commentData.replies.length > 0) {
        repliesSection.classList.remove("hidden");
        repliesSection.classList.add("replies-section");

        const replies = commentData.replies;

        replies.forEach((reply) => {
            const replyElement = renderReply(reply, replyTemplate, currentUser);
            repliesSection.appendChild(replyElement)
        });

    }

    return commentSection;

}


const renderReply = (reply, replyTemplate, currentUser) => {

    const replyElement = document.createElement("div");
    replyElement.classList.add("comment-container");
    replyElement.innerHTML = replyTemplate;

    /* charge reply header */
    const commentHeader = replyElement.querySelector(".comment-header");
    const avatar = commentHeader.querySelector(".replyAvatar");
    const username = commentHeader.querySelector(".username");
    const submitted = commentHeader.querySelector(".submitted");

    /* charge reply content */
    const contentArea = replyElement.querySelector(".comment-body");
    const commentText = contentArea.querySelector(".comment-text");
    const replyTo = commentText.firstElementChild;

    /* charge footer data */
    const footerArea = replyElement.querySelector(".comment-footer");
    const score = footerArea.querySelector(".score");
    const replyButton = footerArea.querySelector(".btn-replyButton");
    const iconContainer = replyButton.firstElementChild;
    const replyIcon = icon.filter((item) => item.name === "reply")[0];


    avatar.src = reply.user.image.png;
    username.innerText = reply.user.username;
    submitted.innerText = reply.createdAt;
    replyTo.innerText = `@${reply.replyingTo}`
    commentText.innerHTML += reply.content;
    score.innerText = reply.score;
    iconContainer.innerHTML += replyIcon.svg;

    if (username.innerText === currentUser.username) {
        const youMark = commentHeader.querySelector(".current-user");
        const replyButtonArea = footerArea.querySelector(".reply-button");
        const optionButtonsArea = replyButtonArea.nextElementSibling;
        const iconDeleteContainer = optionButtonsArea.querySelector(".btn-delete").firstElementChild;
        const iconEditContainer = optionButtonsArea.querySelector(".btn-edit").firstElementChild;
        const deleteIcon = icon.filter((item) => item.name === "delete")[0];
        const editIcon = icon.filter((item) => item.name === "edit")[0];

        youMark.classList.remove("hidden");

        replyButtonArea.classList.add("hidden");
        replyButtonArea.classList.remove("reply-button");
        optionButtonsArea.classList.remove("hidden");
        optionButtonsArea.classList.add("option-buttons");
        iconDeleteContainer.innerHTML += deleteIcon.svg
        iconEditContainer.innerHTML += editIcon.svg

    }

    return replyElement;
}

export { getCommentComponent, renderComment, getRepliesComponent }

