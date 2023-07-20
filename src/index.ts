import { ClientToken } from "./models/ClientToken";
import { Method } from "./models/Method";

export default class Client {
    host: string;
    token?: ClientToken;

    constructor(host: string, token?: ClientToken) {
        this.host = host;
        this.token = token;
    };

    static async request(client: Client, method: Method, url: URL, initialHeaders?: Record<string, string>, body?: BodyInit | undefined): Promise<any> {
        const headers: Record<string, string> = {
            ...initialHeaders
        };

        if(client.token) {
            if(client.token.type === "Bearer")
                headers["Authorization"] = `Bearer ${client.token.key}`;
            else if(client.token.type === "Basic")
                headers["Authorization"] = `Basic ${client.token.email}:${client.token.key}`;
        }

        if(body)
            headers["Content-Type"] = "application/json";

        return new Promise((resolve, reject) => {
            fetch(url.toString(), {
                method,
                headers,
                body
            }).then(async (response) => {
                if(response.status !== 200)
                    throw new Error("Unexpected HTTP error, status code " + response.status + " " + response.statusText + "\nBody: " + (await response.text()));
            
                const result = await response.json();

                resolve(result);
            }).catch((error) => {
                console.error(error);

                reject(error);
            });
        });
    };
};

export * from "./controllers/errors/createError";
