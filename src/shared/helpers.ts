import { AUTH_REDIRECT_LOCATION_STORAGE_KEY } from "@/shared/constants";
import type { Token } from "@/pages/users/types";

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

export function transformTokenToHeaderValue(token: Token | null) {
    return token ? `Bearer ${token}` : "";
}
