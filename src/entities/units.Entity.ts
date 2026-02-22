import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity, JoinColumn, OneToOne } from "typeorm";
import { Buildings } from "./buildings.Entity";
import { User } from "./users.Entity";
import { Tenancies } from "./tenancy.Entity";
import { UnitType } from "../types/building.Types";
import { IsEnum } from "class-validator";

export enum UnitStatus {
    VACANT = 'VACANT',
    OCCUPIED = 'OCCUPIED'
}

@Entity('units')
export class Unit extends BaseEntity {
    /**
     * Unique identifier for the unit (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /**
     * Unique key for the unit (e.g., unit number)
     * @example "A-101", "3B"
     */
    @Column({ length: 50, unique: true })
    unitKey!: string;

    /**
     * Floor number where the unit is located
     * @example 3
     */
    @Column({ type: 'int' })
    floor!: number;

    /**
     * Join column  
     */

    @Column({ name: 'buildingId', nullable: false })
    buildingId!: string;

    /**
     * Building this unit belongs to
     */
    @ManyToOne(() => Buildings, building => building.units, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'buildingId' })
    building!: Buildings;

    /**
     * Current tenant of the unit (nullable for vacant units)
     */
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    tenant?: User;

    /**
     * Type of the unit
     * @example "1 Bedroom", "Studio", "2 Bedroom", "Penthouse"
     */
    @Column({ type: 'enum', enum: UnitType })
    @IsEnum(UnitType, { message: 'type must be a valid UnitType' })
    type!: string;

    /**
     * Description of the unit
     * @example "Spacious 1-bedroom unit with balcony and city view"
     */
    @Column({ type: 'text', nullable: true })
    description?: string;

    /**
     * Monthly rent amount for the unit
     * @example 1200.00
     */
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    rent!: number;

    /**
     * Tenancy history for this unit
     */
    @OneToOne(() => Tenancies, tenancy => tenancy.unit)
    tenancies!: Tenancies[];

    /**
     * Computed status based on whether unit has a tenant
     * Not stored in database - calculated on the fly
     */
    get status(): UnitStatus {
        return this.tenant ? UnitStatus.OCCUPIED : UnitStatus.VACANT;
    }
}