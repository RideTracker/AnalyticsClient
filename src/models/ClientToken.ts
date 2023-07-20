export type ClientToken = {
    type: "Bearer";
    key: string;
} | {
    type: "Basic";
    key: string;
    email: string;
};
