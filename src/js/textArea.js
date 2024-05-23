const getTextareaComponent = async () => {
    try {
        const data = await fetch("./src/partials/TextArea.html");

        if (!data.ok) {
            throw Error("error in component TextArea.html")
        }

        const response = data.text();

        return response;

    } catch (error) {
        console.log(error.message)
    }

}


function showTextArea(textAreaTemplate, currentUser) {

    const textAreaElement = document.createElement("section");
    textAreaElement.classList.add("writte-comment");
    textAreaElement.innerHTML = textAreaTemplate;

    /* show user avatar */
    const textAreaHeader = textAreaElement.querySelector(".writte-comment-flex");
    const avatar = textAreaHeader.querySelector("#avatarWritte");
    avatar.src = currentUser.image.png;


    return textAreaElement;

}

export { showTextArea, getTextareaComponent }