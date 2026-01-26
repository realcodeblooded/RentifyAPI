import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn , CreateDateColumn} from "typeorm";
import { User } from "./user.Entity";
import { RoleKey } from "..//types/role.Types";
import { IsEnum, IsNotEmpty } from "class-validator";

@Entity('roles')
export class Role {
    /**
     * Unique identifier for the role (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /** 
     * Key of the role
     * @example "ADMIN"
     */
    @Column({ type: 'enum', unique: true, enum: RoleKey, default: RoleKey.TENANT })
    @IsNotEmpty({ message: 'Role key is required'})
    key!: RoleKey;

    /** 
     * Name of the role
     * @example "Administrator"
     */
    @Column({ length: 100 })
    @IsNotEmpty({ message: 'Role key is required'})
    name!: string;

    /** 
     * Description of the role
     * @example "Role with full administrative privileges"
     */
    @Column({ type: 'text', nullable: true })
    description?: string;

    /**
     * Users assigned to this role
     */
    @OneToMany(() => User, user => user.role)
    users!: User[];

    /** 
     * Indicates if the role is a system default role
     * @example false
     */
    @Column({type: 'boolean', default: false})
    isSystemDefault!: boolean;

    /** 
     * Timestamp when the role was created
     */
    @CreateDateColumn()
    createdAt!: Date;

    /** 
     * Timestamp when the role was last updated
     */
    @UpdateDateColumn()
    updatedAt!: Date;
}