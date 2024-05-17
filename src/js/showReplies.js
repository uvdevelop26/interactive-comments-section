
import { getRepliesComponent } from "./getComponents.js";
import { icon } from "./icon.js";

async function showReplies(comment, component) {
    const repliesSection = component.querySelector(".comment-container").nextElementSibling;
    const replies = comment.replies;
    const replyComponent = await getRepliesComponent();

    /* show replies area */
    repliesSection.classList.remove("hidden");
    repliesSection.classList.add("replies-section");

    /* adding replie components */
    for (let i = 0; i < replies.length; i++) {
        repliesSection.innerHTML += replyComponent;
    }

    const repliesComponents = repliesSection.querySelectorAll(".comment-container");

    replies.forEach((replie, i) => {
        /* set component id */
        repliesComponents[i].id = `replyComponent${i}`

        /* charge data header */
        const commentHeader = repliesComponents[i].querySelector(".comment-header");
        const avatar = commentHeader.querySelector(".replyAvatar");
        const username = commentHeader.querySelector(".username");
        const submitted = commentHeader.querySelector(".submitted");

        /* charge data content */
        const contentArea = repliesComponents[i].querySelector(".comment-body");
        const commentText = contentArea.querySelector(".comment-text");
        const replyTo = commentText.firstElementChild;

        /* charge data footer */
        const footerArea = repliesComponents[i].querySelector(".comment-footer");
        const score = footerArea.querySelector(".score");
        const replyButton = footerArea.querySelector(".btn-replyButton");
        const iconContainer = replyButton.firstElementChild;
        const replyIcon = icon.filter((item) => item.name === "reply")[0];

        avatar.src = replie.user.image.png;
        username.innerText = replie.user.username;
        submitted.innerText = replie.createdAt;
        replyTo.innerText = `@${replie.replyingTo}`
        commentText.innerHTML += replie.content;
        score.innerText = replie.score;
        iconContainer.innerHTML += replyIcon.svg;

        /* if (replie.user.username === currentuser.username) {
            const replyButtonArea = footerArea.querySelector(".reply-button");
            const optionButtonsArea = replyButtonArea.nextElementSibling;
           
            const currentUserName = commentHeader.querySelector(".current-user");

            currentUserName.classList.remove("hidden")

            replyButtonArea.classList.remove("reply-button");
            replyButtonArea.classList.add("hidden");
            optionButtonsArea.classList.remove("hidden");
            optionButtonsArea.classList.add("option-buttons");

            const btnDelete = optionButtonsArea.querySelector(".btn-delete");
            const btnEdit = optionButtonsArea.querySelector(".btn-edit");
            const iconDeleteContainer = btnDelete.firstElementChild;
            const iconEditContainer = btnEdit.firstElementChild;

            iconDeleteContainer.innerHTML += deleteIcon.svg;
            iconEditContainer.innerHTML += editIcon.svg;

        } */
    });

}



export { showReplies }








