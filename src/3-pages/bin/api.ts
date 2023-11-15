import { put, get } from "@/7-shared/api";

import type { UserDTO, UUID } from "@/3-pages/users/types";
import { mapUserDTOToUser } from "@/3-pages/users/mappers";

export async function fetchUsersBin() {
    return await get("/bin")
        .json<UserDTO[]>()
        .then((users) => users.map(mapUserDTOToUser));
}

export async function restoreUserFn(uuid: UUID) {
    return await put(`/bin/${uuid}?action=restore`).res();
}
