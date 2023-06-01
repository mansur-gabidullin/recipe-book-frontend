import type { Token } from "@/3-pages/users/types";

let accessToken: Token | null = null;

export function getAccessToken() {
    return accessToken;
}

export function setAccessToken(token: Token) {
    accessToken = token;
}

export function removeAccessToken() {
    accessToken = null;
}
