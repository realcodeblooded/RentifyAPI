import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tenancies } from "./tenancy.Entity";

@Entity('maintenances')
export class Maintenances {
    // Maintenance entity definition goes here
    /** 
     * Unique identifier for the maintenance request (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    /** 
     * Tenancies associated with this maintenance request
     */
    @ManyToMany(() => Tenancies, tenancy => tenancy.maintenanceRequests)
    tenancies!: Tenancies[];

    /** 
     * Description of the maintenance issue
     * @example "Leaking faucet in the kitchen"
     */
    @Column({ type: 'text' })
    description!: string;

    /** 
     * Date and time when the maintenance was requested
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    requestedAt!: Date;

    /** 
     * Indicates if the maintenance issue has been resolved
     */
    @Column({ type: 'boolean', default: false })
    isResolved!: boolean;

    /** 
     * Date and time when the maintenance issue was resolved
     */
    @Column({ type: 'timestamp', nullable: true })
    resolvedAt?: Date;

    /** 
     * Notes regarding the resolution of the maintenance issue
     * @example "Replaced the faucet and fixed the leak"
     */
    @Column({ type: 'text', nullable: true })
    resolutionNotes?: string;

    /** 
     * Timestamp when the maintenance record was created
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    /** 
     * Timestamp when the maintenance record was last updated
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}