import wretch, { type FetchLike, type Wretch, type WretchOptions } from "wretch";
import type { WretchError } from "wretch/types";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";
import { QueryClient } from "@tanstack/react-query";

import { accessTokenQueryKey, CSRF_TOKEN_HEADER_KEY, DEFAULT_FAILURE_COUNT } from "@/shared/constants";
import type { AccessTokenData, Token } from "@/pages/users/types";
import { transformTokenToHeaderValue } from "@/shared/helpers";
import { AccessPermissionError, AuthenticationError, CriticalError, CSRFTokenError } from "./exceptions";

let accessToken: Token | null = null;
let csrfToken: Token | null = null;

function useErrorBoundary(error: unknown) {
    return error instanceof CriticalError || error instanceof SyntaxError || error instanceof TypeError;
}

function onError(error: unknown) {
    error instanceof Error && alert(error.message);
}

function onBeforeRetry(failureCount: number, error: unknown) {
    return (
        !(error instanceof CriticalError) &&
        !(error instanceof CSRFTokenError) &&
        failureCount < DEFAULT_FAILURE_COUNT - 1
    );
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary,
            onError,
            retry: onBeforeRetry,
        },
        mutations: {
            useErrorBoundary,
            onError,
            retry: onBeforeRetry,
        },
    },
});

function CSRFTokenMiddleware(next: FetchLike) {
    return async (url: string, opts: WretchOptions) => {
        const response = await next(url, opts);
        csrfToken = response.headers.get(CSRF_TOKEN_HEADER_KEY);
        return response;
    };
}

async function unauthorizedHandler(error: WretchError, request: Wretch) {
    const throwUnauthorizedError = () => {
        throw new AuthenticationError(error);
    };
    const throwAccessPermissionError = () => {
        throw new AccessPermissionError(error);
    };

    // Renew credentials
    const data = await wretch()
        .post(null, "/api/auth/refresh")
        .unauthorized(throwUnauthorizedError)
        .forbidden(throwUnauthorizedError)
        .error(422, throwUnauthorizedError)
        .json<AccessTokenData>();

    accessToken = data.access_token;

    await queryClient.invalidateQueries(accessTokenQueryKey);

    // Replay the original request with new credentials
    return await request
        .auth(transformTokenToHeaderValue(accessToken))
        .fetch()
        .unauthorized(throwUnauthorizedError)
        .forbidden(throwAccessPermissionError)
        .json();
}

function csrfTokenErrorHandler(error: WretchError, originalRequest: Wretch) {
    const headers = originalRequest._options?.headers || { [CSRF_TOKEN_HEADER_KEY]: csrfToken };
    const hasCSRFToken = Boolean(headers[CSRF_TOKEN_HEADER_KEY]);

    if (!hasCSRFToken) {
        throw new CSRFTokenError(error);
    }
}

function criticalErrorHandler(error: WretchError) {
    throw new CriticalError(error);
}

const api = wretch("/api")
    .middlewares([CSRFTokenMiddleware])
    .catcher(401, unauthorizedHandler)
    .catcher(403, unauthorizedHandler)
    .catcher(422, csrfTokenErrorHandler)
    .catcher(500, criticalErrorHandler)
    .addon(FormDataAddon)
    .addon(QueryStringAddon);

function getApiWithTokens() {
    console.log(csrfToken);
    return api.auth(transformTokenToHeaderValue(accessToken)).headers({ [CSRF_TOKEN_HEADER_KEY]: csrfToken ?? "" });
}

export function get(url: string) {
    return getApiWithTokens().get(url);
}

export function post(url: string, body: unknown = null) {
    return getApiWithTokens().post(body, url);
}

export function postFormData(url: string, data: object) {
    return getApiWithTokens().url(url).formData(data).post();
}

export function del(url: string) {
    return getApiWithTokens().delete(url);
}

export async function authenticate(username: string, password: string) {
    const data = await postFormData("/auth/token", {
        username,
        password,
    }).json<AccessTokenData>();
    accessToken = data.access_token;
}

export async function fetchAccessToken() {
    return await get("/auth/token").json<AccessTokenData>();
}

export async function logout() {
    accessToken = null;
    await post("/auth/logout").json();
}
