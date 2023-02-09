import {get, post} from "../shared/api";
import type {AddUserCommandDTO, AddUserCommandResultDTO, UserDTO} from "./types";

export function fetchUsers() {
    return get('/users/').json<Array<UserDTO>>();
}

export function createUser(login: string) {
    const body: AddUserCommandDTO = {login}
    return post('/users/', body).json<AddUserCommandResultDTO>();
}