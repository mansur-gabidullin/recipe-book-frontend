import {useUserList} from "../hooks/useUserList";
import {useState} from "react";

export function UserList() {
    const {users, addUser} = useUserList()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')

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

            <button type="button" onClick={() => login && addUser({login, password, password_confirm})}>
                add user
            </button>
            <br/>

            <ul>{users.map(({id, login}) => <li key={id}>{login}</li>)}</ul>
        </>
    )
}
