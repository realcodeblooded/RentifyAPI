import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.Entity";
import { Length, IsString, IsNotEmpty, IsPhoneNumber, IsEnum } from "class-validator";
import { NextOfKinRelationship } from "../types/user.Types";

@Entity('next_of_kin')
export class NextOfKin extends BaseEntity {
    // NextOfKin entity definition goes here
    /** 
     * Unique identifier for the next of kin (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /** 
     * First name of the next of kin
     * @example "Jane"
     */
    @Column({ length: 100 })
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name must be a string' })
    @Length(2, 100, { message: 'First name must be between 2 and 100 characters' })
    firstName!: string;

    /** 
     * Last name of the next of kin
     * @example "Doe"
     */
    @Column({ length: 100 })
    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'Last name must be a string' })
    @Length(2, 100, { message: 'Last name must be between 2 and 100 characters' })
    lastName!: string;

    /** 
     * Relationship to the user
     * @example "Sibling"
     */
    @Column({ type: 'enum', enum: NextOfKinRelationship })
    @IsNotEmpty({ message: 'Relationship is required' })
    @IsEnum(NextOfKinRelationship, { message: 'Relationship must be one of the predefined values' })
    relationship!: string;

    /** 
     * Contact phone number of the next of kin
     * @example "+1234567890"
     */
    @Column({ length: 15 })
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsPhoneNumber('KE', { message: 'Phone number must be a valid Kenyan phone number' })
    phoneNumber!: string;

    /** 
     * Associated user for this next of kin
     */
    @ManyToOne(() => User, user => user.nextOfKins, { nullable: false })
    user!: User;

    /** 
     * Timestamp when the next of kin record was created
     */
    @CreateDateColumn()
    createdAt!: Date;

    /** 
     * Timestamp when the next of kin record was last updated
     */
    @UpdateDateColumn()
    updatedAt!: Date;
}