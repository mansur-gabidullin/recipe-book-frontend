import {useUserList} from "../hooks/useUserList";
import {useState} from "react";

export function UserList() {
    const {users, addUser} = useUserList()
    const [login, setLogin] = useState('')

    return (
        <>
            <input type="text" name="login" onChange={(event) => setLogin(event.target.value)}/>
            <button type="button" onClick={() => login && addUser(login)}>add user</button>
            <ul>{users.map(({id, login}) => <li key={id}>{login}</li>)}</ul>
        </>
    )
}
