const getData = async () => {

    try {

        const data = await fetch("./data.json");

        if (!data.ok) {
            throw Error("data not available...")
        }

        const response = data.json();

        return response;

    } catch (error) {
        console.log(error.message)
    }

}

const getCommentComponent = async () => {
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
