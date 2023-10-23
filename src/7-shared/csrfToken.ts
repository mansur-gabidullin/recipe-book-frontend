import type { Token } from "@/3-pages/users/types";

let csrfToken: Token | null = null;

export function getCsrfToken() {
    return csrfToken;
}

export function setCsrfToken(token: Token) {
    csrfToken = token;
}

export function removeCsrfToken() {
    csrfToken = null;
}
