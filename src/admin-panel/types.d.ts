export type UserDTO = {
    id: number
    login: string
    email?: string
}

export type AddUserCommandDTO = {
    login: string;
    password: string;
    password_confirm: string;
    email?: string
}

export type AddUserCommandResultDTO = {
    id: number;
}
