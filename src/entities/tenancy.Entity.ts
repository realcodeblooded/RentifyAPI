import { 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    CreateDateColumn, 
    DeleteDateColumn,
    Column, 
    ManyToMany
} from "typeorm";
import { Building } from "./building.Entity";
import { Unit } from "./unit.Entity";
import { User } from "./user.Entity";
import { Maintenance } from "./maintenance.Entity";

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
    @ManyToOne(() => Building, building => building.tenancies, { 
        onDelete: 'CASCADE' 
    })
    building!: Building;

    /**
     * Unit being rented
     */
    @ManyToOne(() => Unit, unit => unit.tenancies, { 
        onDelete: 'CASCADE' 
    })
    unit!: Unit;

    /**
     * Tenant (user) renting the unit
     */
    @ManyToOne(() => User, user => user.tenancies, { 
        onDelete: 'RESTRICT' 
    })
    tenant!: User;

    /** 
     * Maintenance requests associated with this tenancy
     */
    @ManyToMany(() => Maintenance, maintenance => maintenance.tenancies)
    maintenanceRequests!: Maintenance[];

    /**
     * When the tenancy started
     * Automatically set when record is created
     */
    @CreateDateColumn()
    startDate!: Date;

    /**
     * When the tenancy ended
     * NULL means tenancy is still active (soft delete)
     */
    @DeleteDateColumn()
    endDate?: Date;
}