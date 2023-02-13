import {get, post, del} from "../shared/api";
import type {AddUserCommandDTO, AddUserCommandResultDTO, UserDTO, UUID} from "./types";

export function fetchUsers() {
    return get('/users/').json<Array<UserDTO>>();
}

export function fetchUserProfile() {
    return get('/users/profile').json<UserDTO>();
}

export function createUser(body: AddUserCommandDTO) {
    return post('/users/', body).json<AddUserCommandResultDTO>();
}

export function deleteUser(uuid: UUID) {
    return del(`/users/${uuid}`).json<AddUserCommandResultDTO>();
}
