import { get, post, del } from "@/shared/api";
import type { AddUserCommandDTO, AddUserCommandResultDTO, UserDTO, UUID } from "./types";

export async function fetchUsers() {
    return await get("/users/").json<UserDTO[]>();
}

export async function fetchUserProfile() {
    return await get("/users/profile").json<UserDTO>();
}

export async function createUser(body: AddUserCommandDTO) {
    return await post("/users/", body).json<AddUserCommandResultDTO>();
}

export async function deleteUser(uuid: UUID) {
    return await del(`/users/${uuid}`).json<AddUserCommandResultDTO>();
}
