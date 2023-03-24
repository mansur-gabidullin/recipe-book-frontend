export type UUID = string;
export type Token = string;
export type TokenType = string;
export type AccessTokenData = { access_token: Token; token_type: TokenType };

export type UserDTO = {
    uuid: UUID;
    login: string;
    is_removed: boolean;
    is_active: boolean;
    profile?: {
        email: string;
        phone_number?: string;
        name?: string;
        nickname?: string;
        surname?: string;
        patronymic?: string;
    };
};

export type AddUserCommandDTO = {
    login: string;
    password: string;
    password_confirm: string;
    email?: string;
};

export type AddUserCommandResultDTO = {
    id: number;
};
