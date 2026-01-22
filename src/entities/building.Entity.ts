import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BuildingType } from "../types/building.Types";
import { Tenancy } from "./tenancy.Entity";

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
     * @example ["123 Main St, Springfield", "456 Elm St, Springfield"]
     */
    @Column({ type: 'json' })
    location!: string[];

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
     * First rent payment date
     * @example "2024-07-01"
     */
    @Column({ type: 'date', nullable: false })
    firstRentpayDate!: Date;

    /** 
     * Late rent payment date
     * End of grace period
     * @example "2024-07-10"
     */
    @Column({ type: 'date', nullable: false })
    lateRentPayDate!: Date;

    /** 
     * Timestamp when the building was created
     */
    @CreateDateColumn()
    createdAt!: Date;

    /** 
     * Timestamp when the building was last updated
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    /** 
     * Tenancies associated with the building
     */
    @OneToMany(() => Tenancy, tenancy => tenancy.building)
    tenancies!: Tenancy[];

    /** 
     * Units associated with the building
     */
    @OneToMany(() => Tenancy, tenancy => tenancy.unit)
    units!: Tenancy[];
}