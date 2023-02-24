import wretch from 'wretch'
import FormDataAddon from "wretch/addons/formData"
import QueryStringAddon from "wretch/addons/queryString"
import {QueryClient} from "@tanstack/react-query";

import {AuthenticationError} from "./exceptions";
import {ACCESS_TOKEN_STORAGE_KEY, AUTH_REDIRECT_LOCATION_STORAGE_KEY} from "./constants";


function useErrorBoundary(error: unknown) {
    return error instanceof Error;
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

export function getAccessToken() {
    const token = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || '';
    return token && `Bearer ${token}`
}

export function setAccessToken(token: string) {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
}

export function getAuthRedirectLocation() {
    return window.localStorage.getItem(AUTH_REDIRECT_LOCATION_STORAGE_KEY) || '/';
}

export function setAuthRedirectLocation(location: string) {
    if (!location) {
        window.localStorage.removeItem(AUTH_REDIRECT_LOCATION_STORAGE_KEY)
        return
    }
    window.localStorage.setItem(AUTH_REDIRECT_LOCATION_STORAGE_KEY, location)
}

const api = wretch('/api')
    .auth(getAccessToken())
    .catcher(401, async (error, request) => {
        // Renew credentials and replay the original request with new credentials
        return request.auth(getAccessToken()).fetch().unauthorized((error) => {
            throw new AuthenticationError(error);
        }).json();
    })
    .addon(FormDataAddon).addon(QueryStringAddon);

export function get(url: string) {
    return api.get(url)
}

export function post(url: string, body: unknown) {
    return api.post(body, url)
}

export function postFormData(url: string, data: object) {
    return api.url(url).formData(data).post()
}

export function del(url: string) {
    return api.delete(url)
}
