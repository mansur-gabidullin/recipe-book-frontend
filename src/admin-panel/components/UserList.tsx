import {useState} from "react";

import {useUserList} from "../hooks/useUserList";

export function UserList() {
    const {users, addUser, removeUser} = useUserList()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')

    return (
        <>
            <br/>

            <span>login</span>
            <input type="text" name="login" value={login} onChange={(event) => setLogin(event.target.value)}/>
            <br/>

            <span>password</span>
            <input type="password" name="password" value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <br/>

            <span>password_confirm</span>
            <input type="password" name="password_confirm" value={password_confirm}
                   onChange={(event) => setPasswordConfirm(event.target.value)}/>
            <br/>

            <span>email</span>
            <input type="email" name="email" value={email}
                   onChange={(event) => setEmail(event.target.value)}/>
            <br/>

            <button type="button" onClick={() => login && addUser({login, password, password_confirm, email})}>
                add user
            </button>
            <br/>

            <ul>{users.map(({uuid, login, is_removed, profile}) => (
                <li key={uuid}>
                    {is_removed ? (
                        <del>
                            {login} {' '} {profile?.email} {' '}
                        </del>
                    ) : (
                        <>
                            {login} {' '} {profile?.email} {' '}
                            <button type="button" onClick={() => removeUser(uuid)}>delete</button>
                        </>
                    )}
                </li>
            ))}</ul>
        </>
    )
}
