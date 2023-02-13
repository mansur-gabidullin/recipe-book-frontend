import {postFormData, setAccessToken} from "../shared/api";

type TokenData = { access_token: string, token_type: string }

export async function authenticate(username: string, password: string) {
    const {access_token} = await postFormData('/auth/token', {username, password}).json<TokenData>()
    setAccessToken(access_token)
}
