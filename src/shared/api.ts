import wretch from "wretch";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";
import { QueryClient } from "@tanstack/react-query";

import { AccessPermissionError, AuthenticationError, CriticalError } from "./exceptions";
import { AUTH_REDIRECT_LOCATION_STORAGE_KEY } from "@/shared/constants";
import type { Token, TokenData, TokenType } from "@/pages/users/types";

function useErrorBoundary(error: unknown) {
    return error instanceof CriticalError || error instanceof SyntaxError;
}

function onError(error: unknown) {
    error instanceof Error && alert(error.message);
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary,
            onError,
        },
        mutations: {
            useErrorBoundary,
            onError,
        },
    },
});

export function getAuthRedirectLocation() {
    return window.localStorage.getItem(AUTH_REDIRECT_LOCATION_STORAGE_KEY) ?? "/";
}

export function setAuthRedirectLocation(location: string) {
    if (!location) {
        window.localStorage.removeItem(AUTH_REDIRECT_LOCATION_STORAGE_KEY);
        return;
    }
    window.localStorage.setItem(AUTH_REDIRECT_LOCATION_STORAGE_KEY, location);
}

let accessToken: Token | null = null;
let accessTokenType: TokenType | null = null;

function transformTokenToHeaderValue(token: Token) {
    return accessTokenType ? `${accessTokenType} ${token}` : "";
}

const api = wretch("/api")
    .catcher(401, async (error, request) => {
        const unauthorizedError = new AuthenticationError(error);

        // Renew credentials
        const { access_token } = await wretch()
            .post(null, "/api/auth/refresh")
            .unauthorized(() => {
                throw unauthorizedError;
            })
            .json<TokenData>();

        // Replay the original request with new credentials
        return await request
            .auth(transformTokenToHeaderValue(access_token))
            .fetch()
            .unauthorized(() => {
                throw unauthorizedError;
            })
            .json();
    })
    .catcher(500, async (error) => {
        throw new CriticalError(error);
    })
    .catcher(403, async (error) => {
        throw new AccessPermissionError(error);
    })
    .addon(FormDataAddon)
    .addon(QueryStringAddon);

function getApiWithAuth() {
    return accessToken ? api.auth(transformTokenToHeaderValue(accessToken)) : api;
}

export function get(url: string) {
    return getApiWithAuth().get(url);
}

export function post(url: string, body: unknown = null) {
    return getApiWithAuth().post(body, url);
}

export function postFormData(url: string, data: object) {
    return getApiWithAuth().url(url).formData(data).post();
}

export function del(url: string) {
    return getApiWithAuth().delete(url);
}

export async function authenticate(username: string, password: string) {
    const { access_token, token_type } = await postFormData("/auth/token", {
        username,
        password,
    }).json<TokenData>();
    accessToken = access_token;
    accessTokenType = token_type.charAt(0).toUpperCase() + token_type.slice(1);
}

export function logout() {
    accessToken = null;
}
