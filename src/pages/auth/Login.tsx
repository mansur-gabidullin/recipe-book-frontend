import { type FormEventHandler, useState } from "react";
import { Navigate } from "react-router-dom";

import { authenticate } from "@/shared/api";
import useAccessToken from "@/shared/hooks/useAccessToken";
import { getAuthRedirectLocation, setAuthRedirectLocation } from "@/shared/helpers";

export function Login() {
    useAccessToken();

    const [isLoading, setIsLoading] = useState(false);
    const [redirectLocation, setRedirectLocation] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            await authenticate(login, password);
            setRedirectLocation(getAuthRedirectLocation());
            setAuthRedirectLocation("");
        } finally {
            setIsLoading(false);
        }
    };

    return redirectLocation ? (
        <Navigate to={redirectLocation} replace />
    ) : (
        <form onSubmit={onSubmit}>
            login:
            <input
                type="text"
                name="username"
                value={login}
                onChange={(event) => {
                    setLogin(event.target.value);
                }}
            />
            <br />
            password:
            <input
                type="text"
                name="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button disabled={isLoading}>Авторизоваться</button>
        </form>
    );
}
