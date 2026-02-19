export enum RoleKey {
    ADMIN = 'ADMIN',
    TENANT = 'TENANT',
    MANAGER = 'MANAGER',
}

export type BaseRole = {
    key: RoleKey;
    name: string;
    description: string;
} 