import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuildingType } from "../types/building.Types";
import { Tenancy } from "./tenancy.Entity";
import { Unit } from "./units.Entity";
import { Amenities } from "./amenities.Entity";

@Entity('buildings')
export class Buildings extends BaseEntity {
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
    @Column({ type: 'varchar', length: 255 })
    locationName!: string

    @Column({ type: 'numeric' })
    x!: number

    @Column({ type: 'numeric' })
    y!: number

    /** 
     * Photo URLs of the building
     * @example ["http://example.com/photo1.jpg", "http://example.com/photo2.jpg"]
     */
    @Column({ type: 'json', default: null })
    photos!: string[];

    /** 
     * Type of the building
     * @example "Apartment"
     */
    @Column({ type: 'enum', enum: BuildingType, nullable: false })
    type!: BuildingType;

    /** 
     * Amenities available in the building
     */
    @ManyToMany(() => Amenities, amenity => amenity.id)
    amenities!: string[];

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