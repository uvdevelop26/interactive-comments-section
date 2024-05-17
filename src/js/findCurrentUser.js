import { icon } from "./icon.js"
import { getTextareaComponent } from "./getComponents.js";

const findCurrentUser = async (comments, currentuser) => {
    const commentComponents = main.querySelectorAll(".comment-section");
    const textAreaComponent = await getTextareaComponent();

    comments.forEach((comment, i) => {
        if (comment.user.username === currentuser.username) {
            console.log('yes')
        }

        if (comment.replies.length !== 0) {
            const replies = comment.replies;
            setTimeout(() => {
                const repliesSection = commentComponents[i].querySelector(".replies-section")
                const repliesComponents = repliesSection.querySelectorAll(".comment-container");

                replies.forEach((replie, j) => {
                    if (replie.user.username === currentuser.username) {
                        const commentHeader = repliesComponents[j].querySelector(".comment-header");
                        const footerArea = repliesComponents[j].querySelector(".comment-footer");
                        const youMark = commentHeader.querySelector(".current-user");
                        const replyButtonArea = footerArea.querySelector(".reply-button");
                        const optionButtonsArea = replyButtonArea.nextElementSibling;
                        const iconDeleteContainer = optionButtonsArea.querySelector(".btn-delete").firstElementChild;
                        const iconEditContainer = optionButtonsArea.querySelector(".btn-edit").firstElementChild;

                        /* icons */
                        const deleteIcon = icon.filter((item) => item.name === "delete")[0];
                        const editIcon = icon.filter((item) => item.name === "edit")[0];

                        /* add you mark */
                        youMark.classList.remove("hidden");

                        /* show option buttons */
                        replyButtonArea.classList.add("hidden");
                        replyButtonArea.classList.remove("reply-button");
                        optionButtonsArea.classList.remove("hidden");
                        optionButtonsArea.classList.add("option-buttons");
                        iconDeleteContainer.innerHTML += deleteIcon.svg
                        iconEditContainer.innerHTML += editIcon.svg

                    }

                });

            }, 50);
        }
    });

    setTimeout(() => {
        main.innerHTML += textAreaComponent;

        const textArea = main.querySelector(".writte-comment");

        const avatar = textArea.querySelector("#avatarWritte");

        avatar.src = currentuser.image.png;
    }, 70);

}



export { findCurrentUser }