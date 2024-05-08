

async function getData() {

    try {

        const data = await fetch("./data.json");

        if (!data.ok) {
            throw Error("data not available...")
        }

        const response = data.json;

        return response;

    } catch (error) {
        console.log(error.message)
    }

}

const prueba = getData();

console.log(prueba)