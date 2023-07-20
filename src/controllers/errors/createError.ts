import Client from "../..";
import { DefaultResponse } from "../../models/DefaultResponse";

export async function createError(client: Client, error: string, data: string, service: string, environment: string, payload: string): Promise<DefaultResponse> {
    const url = new URL(`${client.host}/api/error`);

    const body = {
        error,
        data,
        service,
        environment,
        payload
    };

    return Client.request(client, "POST", url, undefined, JSON.stringify(body));
};
