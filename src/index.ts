import { AuthClient, AuthClientToken } from "@ridetracker/authclient";

export default class AnalyticsClient extends AuthClient {
    constructor(host: string, token?: AuthClientToken) {
        super("AnalyticsClient-0.9.0", host, token);
    };
};

export * from "./controllers/errors/createError";
