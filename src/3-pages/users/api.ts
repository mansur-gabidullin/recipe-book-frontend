import { get, post, del } from "@/7-shared/api";
import type { AddUserCommandResultDTO, UserDTO, UUID, AddUserFormData } from "./types";
import { mapUserDTOToUser, mapUserFormDataToAddUserCommandDTO } from "@/3-pages/users/mappers";

export async function fetchUsers() {
    return await get("/users/")
        .json<UserDTO[]>()
        .then((users) => users.map(mapUserDTOToUser));
}

export async function fetchUserProfile() {
    return await get("/users/profile").json<UserDTO>();
}

export async function createUser(formData: AddUserFormData) {
    const body = mapUserFormDataToAddUserCommandDTO(formData);
    return await post("/users/", body).json<AddUserCommandResultDTO>();
}

export async function deleteUser(uuid: UUID) {
    return await del(`/users/${uuid}`).res();
}
