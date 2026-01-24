import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingType } from "../types/building.Types";
import { Tenancy } from "./tenancy.Entity";
import { Unit } from "./unit.Entity";

@Entity('building')
export class Building {
    /**
     * Unique identifier for the building (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /** 
     * Name of the building
     * @example "Sunset Apartments"
     */
    @Column({ unique: true, length: 100, nullable: false, type: 'varchar' })
    buildingName!: string;

    /** 
     * Location(s) of the building
     * @example "123 Main St, Springfield"
     */
    @Column({ type: 'varchar', length: 255, nullable: false })
    location!: string;

    /** 
     * Photo URLs of the building
     * @example ["http://example.com/photo1.jpg", "http://example.com/photo2.jpg"]
     */
    @Column({ type: 'json' })
    photos!: string[];

    /** 
     * Type of the building
     * @example "Apartment"
     */
    @Column({ type: 'enum', enum: BuildingType, nullable: false })
    type!: BuildingType;

    /** 
     * Timestamp when the building was created
     */
    @CreateDateColumn()
    createdAt!: Date;

    /** 
     * Timestamp when the building was last updated
     */
    @UpdateDateColumn()
    updatedAt!: Date;

    /** 
     * Tenancies associated with the building
     */
    @OneToMany(() => Tenancy, tenancy => tenancy.building)
    tenancies!: Tenancy[];

    /** 
     * Units associated with the building
     */
    @OneToMany(() => Unit, unit => unit.building)
    units!: Unit[];
}