import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    OneToMany,
    UpdateDateColumn,
    BaseEntity,
    Column,
    JoinColumn,
    OneToOne
} from "typeorm";
import { Property } from "./property.Entity";
import { Unit } from "./units.Entity";
import { User } from "./users.Entity";
import { Maintenances } from "./maintenances.Entity";
import { Contract } from "./contracts.Entity";

@Entity('tenancies')
export class Tenancies extends BaseEntity {
    /**
     * Unique identifier for the tenancy (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'buildingId' })
    buildingId!: string;


    /**
     * Building where the tenancy is located
    */
    @ManyToOne(() => Property, property => property.tenancies, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'buildingId' })
    building!: Property;

    @Column({ name: 'unitId' })
    unitId!: string;

    /**
     * Unit being rented
     */
    @ManyToOne(() => Unit, unit => unit.tenancies, {
        onDelete: 'CASCADE',
        eager: true
    })
    unit!: Unit
    // @JoinColumn({ name: 'unitId' })
    // unit!: Unit;

    @Column({ name: 'tenantId' })
    tenantId!: string;

    /**
     * Tenant (user) renting the unit
     */
    @ManyToOne(() => User, user => user.tenancies, {
        onDelete: 'RESTRICT', eager: true
    })

    @JoinColumn({ name: 'tenantId' })
    tenant!: User;

    @OneToMany(() => Contract, contract => contract.tenancy, { nullable: false })
    contracts!: Contract[];


    /** 
     * Maintenance requests associated with this tenancy
     */
    @ManyToMany(() => Maintenances, maintenance => maintenance.tenancies)
    maintenanceRequests!: Maintenances[];

    /**
     * When the tenancy started
     * Automatically set when record is created
     */
    @CreateDateColumn()
    startDate!: Date;

    /** 
     * When the tenancy was last updated
     */

    @UpdateDateColumn()
    updatedAt!: Date;

    /**
     * When the tenancy ended
     * NULL means tenancy is still active (soft delete)
     */
    @DeleteDateColumn()
    endDate?: Date;
}