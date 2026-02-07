import { RoleKey } from "./role.Types";

export type BaseUserDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    idNumber: number;
    nextOfKins: NextOfKinDetails[]
};

export type NextOfKinDetails = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    relationship: NextOfKinRelationship;
}

export enum NextOfKinRelationship {
    SPOUSE = 'Spouse',
    PARENT = 'Parent',
    SIBLING = 'Sibling',
    FRIEND = 'Friend',
    OTHER = 'Other'
}