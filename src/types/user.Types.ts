export interface CreateUserRequest extends BaseUserDetails {
    password: string;
    idNumber: number;
    nextOfKins: NextOfKinDetails[];
}

export interface UserResponse extends BaseUserDetails {
    id: string;
    idNumber: string;
}

export interface BaseUserDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
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