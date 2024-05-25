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
        let mql = window.matchMedia("(min-width: 1024px)");
        /* comment header config */
        const youMark = commentHeader.querySelector(".current-user");
        const replyButtonsHeader = commentHeader.querySelector(".reply-button");
        const optionButtonsheader = replyButtonsHeader.previousElementSibling;
        const iconDeleteHeaderContainer = optionButtonsheader.querySelector(".btn-delete").firstElementChild;
        const iconEditHeaderContainer = optionButtonsheader.querySelector(".btn-edit").firstElementChild;

        /* comment footers */
        const replyButtonsFooter = footerArea.querySelector(".reply-button");
        const optionButtonsFooter = replyButtonsFooter.nextElementSibling;
        const deleteIcon = icon.filter((item) => item.name === "delete")[0];
        const editIcon = icon.filter((item) => item.name === "edit")[0];
        const iconDeleteContainer = optionButtonsFooter.querySelector(".btn-delete").firstElementChild;
        const iconEditContainer = optionButtonsFooter.querySelector(".btn-edit").firstElementChild;
        iconDeleteContainer.innerHTML += deleteIcon.svg
        iconEditContainer.innerHTML += editIcon.svg

        youMark.classList.remove("hidden");
        replyButtonsFooter.classList.add("hidden");
        replyButtonsFooter.classList.remove("reply-button");
        optionButtonsFooter.classList.remove("hidden");
        optionButtonsFooter.classList.add("option-buttons");

        let match = mql.matches;

        if (match) {
            optionButtonsheader.style.display = "flex";
            iconDeleteHeaderContainer.innerHTML = deleteIcon.svg;
            iconEditHeaderContainer.innerHTML = editIcon.svg;
            replyButtonsHeader.classList.remove("reply-button");
            replyButtonsHeader.classList.add("hidden");
        }

        mql.addEventListener("change", () => {

            match = mql.matches;

            if (match) {
                optionButtonsheader.style.display = "flex";
                iconDeleteHeaderContainer.innerHTML = deleteIcon.svg;
                iconEditHeaderContainer.innerHTML = editIcon.svg;
                replyButtonsHeader.classList.remove("reply-button");
                replyButtonsHeader.classList.add("hidden");
            } else if (!match) {
                optionButtonsheader.style.display = "none";
            }

        })

    }

    return replyElement;
}

export { getCommentComponent, renderComment, getRepliesComponent }

