window.onload = chargeInterface;

const mainContainer = document.querySelector("#main");

async function chargeInterface() {

    /* data from JSON */
    const data = await getData();
    /* Components */
    const commentComponent = await getCommentComponent();
    const TextArea = await getTextareaComponent();
    const repliesComponent = await getRepliesComponent();

    /* using data */
    const comments = data.comments;
    const currentUser = data.currentUser;


    //inject the main components
    for (let i = 0; i < comments.length; i++) {
        mainContainer.innerHTML += commentComponent
    }

    //charge the info
    const commentComponents = mainContainer.querySelectorAll("#commentSection");

    commentComponents.forEach((item, index) => {
        const avatar = item.querySelector("#avatar");
        const username = item.querySelector("#username");
        const timestamp = item.querySelector("#timestamp");
        const content = item.querySelector("#content");
        const score = item.querySelector("#score");

        avatar.src = comments[index].user.image.png;
        username.innerText = comments[index].user.username;
        timestamp.innerText = comments[index].createdAt;
        content.innerText = comments[index].content;
        score.innerText = comments[index].score;

        /* inject replies if it has */
        if (comments[index].replies.length !== 0) {
            const replieSection = item.querySelector("#repliesSection");
            const replies = comments[index].replies;

            replieSection.classList.remove("hidden");
            replieSection.classList.add("replies-section");

            for (let i = 0; i < replies.length; i++) {
                replieSection.innerHTML += repliesComponent
            }

            /* charge the info of the replies */
            const repliesComponents = replieSection.querySelectorAll("#replies");

            repliesComponents.forEach((item, index) => {
                const replieAvatar = item.querySelector("#replyAvatar");
                const usernameReply = item.querySelector("#usernameReply");
                const submittedReply = item.querySelector("#submittedReply");
                const scoreReply = item.querySelector("#scoreReply");
                const commentText = item.querySelector("#commentText");

                replieAvatar.src = replies[index].user.image.png;
                usernameReply.innerText = replies[index].user.username;
                submittedReply.innerText = replies[index].createdAt;
                scoreReply.innerText = replies[index].score;
                commentText.innerText = replies[index].content;
            })
        }

    });

    mainContainer.innerHTML += TextArea

    setCurrentUser(currentUser, comments)



}

const setCurrentUser = (currentUser, comments) => {

    const commentComponents = mainContainer.querySelectorAll("#commentSection");
    const writteComment = mainContainer.querySelector("#writteArea");
    const avatarWritte = writteComment.querySelector("#avatarWritte");

    avatarWritte.src = currentUser.image.png;

    commentComponents.forEach((item) => {
        const replieSection = item.querySelector("#repliesSection");

        if (!replieSection.classList.contains("hidden")) {
            const replies = replieSection.querySelectorAll("#replies");

            replies.forEach((item) => {
                const username = item.querySelector("#usernameReply")

                if (username.innerText === currentUser.username) {
                    const youMark = username.nextElementSibling;
                    const replyButton = item.querySelector("#replyButton");
                    const optionButtons = item.querySelector("#optionButtons");
                    youMark.classList.remove("hidden");
                    replyButton.classList.add("hidden");
                    optionButtons.classList.remove("hidden")

                }
            })
        }

    });

  //  setReplyConfig(commentComponents, comments)

}

/* const setReplyConfig = (commentComponent, comments) => {

    comments.forEach((item, index) => {
        const username = item.user.username;
        console.log(username)
        if (item.replies.length !== 0) {
            const replies = item.replies;
            const repliesComponent = commentComponent[index].querySelectorAll("#repliesSection #replies");

            repliesComponent.forEach((rep, i) => {

            });
        }

    });

}
 */



