import type { AccessTokenData } from "@/3-pages/users/types";
import { get, post, postFormData } from "@/7-shared/api";
import { removeAccessToken, setAccessToken } from "@/7-shared/auth/accessToken";

export async function authenticate(username: string, password: string) {
    const data = await postFormData("/auth/token", {
        username,
        password,
    }).json<AccessTokenData>();
    setAccessToken(data.access_token);
}

export async function fetchAccessToken() {
    return await get("/auth/token").json<AccessTokenData>();
}

export async function logout() {
    removeAccessToken();
    await post("/auth/logout").json();
}
