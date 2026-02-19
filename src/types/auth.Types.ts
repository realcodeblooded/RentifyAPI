import { RoleKey } from "./role.Types";

export interface BaseAuthDetails {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse extends BaseAuthDetails {
    accessToken: string;
    refreshToken: string;
}