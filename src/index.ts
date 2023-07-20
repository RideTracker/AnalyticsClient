import { AuthClient, AuthClientToken, RequestMethod } from "@ridetracker/authclient";

export default class AnalyticsClient extends AuthClient {
    constructor(host: string, token?: AuthClientToken) {
        super("AnalyticsClient-0.9.0", host, token);
    };

    static async request<T = any>(client: AnalyticsClient, method: RequestMethod, url: URL, initialHeaders?: Record<string, string>, body?: BodyInit | undefined): Promise<T> {
        return new Promise((resolve, reject) => {
            super.request(client, method, url, initialHeaders, body).then(async (response) => {
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
