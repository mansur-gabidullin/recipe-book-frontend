import type { AddUserCommandDTO, AddUserFormData, User, UserDTO } from "@/3-pages/users/types";

export function mapUserFormDataToAddUserCommandDTO(formData: AddUserFormData): AddUserCommandDTO {
    const { login, email, password, passwordConfirm } = formData;

    return {
        login,
        email,
        password,
        password_confirm: passwordConfirm,
    };
}

export function mapUserDTOToUser(userDTO: UserDTO): User {
    const { uuid, login, is_removed: isRemoved, is_active: isActive, profile } = userDTO;
    const {
        email = "",
        phone_number: phoneNumber = "",
        name = "",
        nickname = "",
        surname = "",
        patronymic = "",
    } = profile ?? {};

    return {
        uuid,
        login,
        isRemoved,
        isActive,
        email,
        phoneNumber,
        name,
        nickname,
        surname,
        patronymic,
    };
}
