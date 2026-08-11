import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Invoice } from "./invoice.Entity";

@Entity("Payment")
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToMany(() => Invoice, (invoice) => invoice.payments)
    invoice!: string;

    @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
    @IsNumber({}, { message: "amountPaid must be a valid number" })
    @IsPositive({ message: "amountPaid must be a positive value" })
    amountPaid!: number;

    @Column({ type: "timestamp", nullable: false })
    @IsDate({ message: "paymentDate must be a valid date" })
    paymentDate!: Date;

    @Column({ type: "varchar", length: 255, nullable: false })
    @IsString({ message: "transactionRef must be a string" })
    @IsNotEmpty({ message: "transactionRef is required" })
    @MinLength(3, { message: "transactionRef must be at least 3 characters" })
    transactionRef!: string;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;
}
