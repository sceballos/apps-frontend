const serverInfo = {
    host: "localhost",
    port: "5880"
};

const baseUrl = `http://${serverInfo.host}:${serverInfo.port}`;

export default async function baseRequest(path, method, params, token) {

    try {
        const data = await fetch(`${baseUrl}${path}`,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(params)
            });
        const json = await data.json();
        return json;
    } catch (error) {
        return { error : "An unexpected error ocurred"}
    }
}