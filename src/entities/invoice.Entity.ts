import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contract } from "./contracts.Entity";
import { Payment } from "./payment.Entity";

@Entity('invoice')
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Contract, (contract) => contract.invoices)
    contract!: Contract;

    @OneToMany(() => Payment, (payment) => payment.invoice)
    payments!: Payment[]

    @Column()
    amountDue!: number;

    @Column()
    dueDate!: Date;

    @Column()
    billingPeriodStart!: Date;

    @Column()
    billingPeriodEnd!: Date;

    @Column({ type: 'enum', enum: ['PAID', 'OVERDUE', 'PARTIAL'], default: 'OVERDUE' })
    status!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}