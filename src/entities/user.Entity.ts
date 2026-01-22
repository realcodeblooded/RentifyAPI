import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { 
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsPhoneNumber, 
    IsString, 
    Length, 
    Min 
} from "class-validator";
import { Role } from "./role.Entity";
import { Tenancy } from "./tenancy.Entity";

/**
 * User entity representing a registered user in the system.
 * Includes personal information, contact details, and next of kin information.
 */
@Entity('users')
@Index(['firstName'])
export class User {
    /**
     * Unique identifier for the user (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /**
     * User's first name
     * @example "John"
     */
    @Column({ length: 100 })
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name must be a string' })
    @Length(2, 100, { message: 'First name must be between 2 and 100 characters' })
    firstName!: string;

    /**
     * User's last name
     * @example "Doe"
     */
    @Column({ length: 100 })
    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'Last name must be a string' })
    @Length(2, 100, { message: 'Last name must be between 2 and 100 characters' })
    lastName!: string;

    /**
     * User's national identification number
     * Must be unique in the system
     * @example 12345678
     */
    @Column({ unique: true, type: 'bigint' })
    @IsNotEmpty({ message: 'ID number is required' })
    @IsNumber({}, { message: 'ID number must be a valid number' })
    @Min(1, { message: 'ID number must be a positive number' })
    idNumber!: number;

    /**
     * User's phone number
     * @example "+254712345678"
     */
    @Column({ length: 20 })
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsPhoneNumber('KE', { message: 'Phone number must be a valid Kenyan phone number' })
    phone!: string;

    @Column({ length: 255 })
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;

    /**
     * User's email address
     * Must be unique in the system
     * @example "john.doe@example.com"
     */
    @Column({ unique: true, length: 255 })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email!: string;

    /**
     * Full name of the user's next of kin
     * @example "Jane Doe"
     */
    @Column({ length: 200 })
    @IsNotEmpty({ message: 'Next of kin full name is required' })
    @IsString({ message: 'Next of kin full name must be a string' })
    @Length(2, 200, { message: 'Next of kin full name must be between 2 and 200 characters' })
    nextOfKinFullName!: string;

    /**
     * Phone number of the user's next of kin
     * @example "+254723456789"
     */
    @Column({ length: 20 })
    @IsNotEmpty({ message: 'Next of kin phone number is required' })
    @IsPhoneNumber('KE', { message: 'Next of kin phone number must be a valid Kenyan phone number' })
    nextOfKinPhone!: string;

    /**
     * Role assigned to the user
     * Many users can have one role
     */

    @ManyToOne(() => Role, role => role.users, { eager: true })
    role!: Role;


    /**
     * Timestamp when the user record was created
     * Automatically managed by TypeORM
     */
    @CreateDateColumn()
    createdAt!: Date;

    /**
     * Timestamp when the user record was last updated
     * Automatically managed by TypeORM
     */
    @UpdateDateColumn()
    updatedAt!: Date;

    /**
     * Timestamp when the user record was soft deleted
     * Null if the record is active
     * Automatically managed by TypeORM soft delete feature
     */
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;

    /**
     * Gets the user's full name
     * @returns The concatenated first and last name
     */
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Checks if the user account is active (not soft deleted)
     * @returns True if the user is active, false otherwise
     */
    isActive(): boolean {
        return !this.deletedAt;
    }

    /** 
     * Tenancies associated with the user
     */
    @OneToMany(() => Tenancy, tenancy => tenancy.tenant)
    tenancies!: Tenancy[];
}