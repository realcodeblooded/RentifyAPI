import { IsNumber } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tenancies } from "./tenancy.Entity";
import { User } from "./users.Entity";

@Entity('contracts')
export class Contracts extends BaseEntity {
    // Contract entity definition goes here
    /**
     * Unique identifier for the contract (UUID format)
     */
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'tenancyId' })
    tenancyId!: string

    /** 
     * Tenancy associated with the contract
     */
    @ManyToOne(() => Tenancies, (tenancy) => tenancy.contracts, { nullable: false })
    @JoinColumn({ name: 'tenancyId' })
    tenancy!: Tenancies;

    /** 
     * Amount to be paid under the contract
     */
    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
    @IsNumber({}, { message: 'Rent must be a number' })
    rent!: number;

    /** 
     * Currency of the amount
     * @example "KSH"
     */
    @Column({ type: 'enum', enum: ['KSH'], default: 'KSH', nullable: false })
    currency!: string;

    /** 
     * Payment frequency
     * @example "MONTHLY"
     */
    @Column({ type: 'enum', enum: ['MONTHLY', 'YEARLY', 'QUARTERLY'], default: 'MONTHLY', nullable: false })
    frequency!: string;

    /**
     * Grace period in days for payments
     * @example 5
     */
    @Column({ type: 'integer', nullable: false, default: 0 })
    gracePeriod!: number;

    /** 
     * When the contract starts
     */
    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    startDate!: Date;

    /** 
     * When the contract ends
     */
    @Column({ type: 'datetime', default: null, nullable: true })
    endDate!: Date | null;

    /**
     * Is the contract currently active
     */
    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    /** 
     * Timestamps and user tracking
     */
    @CreateDateColumn()
    createdAt!: Date;

    /** 
     * When the contract was last updated
     */
    @UpdateDateColumn()
    updatedAt!: Date;

    /** 
     * When the contract was deleted (soft delete)
     */
    @DeleteDateColumn()
    deletedAt!: Date | null;
}