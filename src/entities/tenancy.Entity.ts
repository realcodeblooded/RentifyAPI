import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    OneToMany,
    UpdateDateColumn
} from "typeorm";
import { Buildings } from "./buildings.Entity";
import { Unit } from "./units.Entity";
import { User } from "./users.Entity";
import { Maintenances } from "./maintenances.Entity";
import { Contracts } from "./contracts.Entity";

@Entity('tenancies')
export class Tenancy {
    /**
     * Unique identifier for the tenancy (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /**
     * Building where the tenancy is located
     */
    @ManyToOne(() => Buildings, building => building.tenancies, {
        onDelete: 'CASCADE',
        eager: true
    })
    building!: Buildings;

    /**
     * Unit being rented
     */
    @ManyToOne(() => Unit, unit => unit.tenancies, {
        onDelete: 'CASCADE',
        eager: true
    })
    unit!: Unit;

    /**
     * Tenant (user) renting the unit
     */
    @ManyToOne(() => User, user => user.tenancies, {
        onDelete: 'RESTRICT'
    })
    tenant!: User;

    @OneToMany(() => Contracts, contract => contract.tenancy, { nullable: false })
    contracts!: Contracts[];

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