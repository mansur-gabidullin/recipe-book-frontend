import { useState } from "react";

import { useUserList } from "../hooks/useUserList";

export function UserList() {
    const { users, addUser, removeUser, isLoading } = useUserList();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const userFormData = { login, password, passwordConfirm, email };

    return isLoading ? (
        <span>Loading ... </span>
    ) : (
        <>
            <br />

            <span>login</span>
            <input
                type="text"
                name="login"
                value={login}
                onChange={(event) => {
                    setLogin(event.target.value);
                }}
            />
            <br />

            <span>password</span>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <br />

            <span>password_confirm</span>
            <input
                type="password"
                name="password_confirm"
                value={passwordConfirm}
                onChange={(event) => {
                    setPasswordConfirm(event.target.value);
                }}
            />
            <br />

            <span>email</span>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <br />

            <button
                type="button"
                onClick={() => {
                    login && addUser(userFormData);
                }}
            >
                add user
            </button>
            <br />

            <ul>
                {users.map(({ uuid, login, isRemoved, email }) => (
                    <li key={uuid}>
                        {isRemoved ? (
                            <del>
                                {login} {email}{" "}
                            </del>
                        ) : (
                            <>
                                {login} {email}{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        removeUser(uuid);
                                    }}
                                >
                                    delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}
