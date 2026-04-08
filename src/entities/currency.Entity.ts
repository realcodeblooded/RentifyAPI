import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('')
export class Currencies {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    currency!: string

    @Column()
    symbol!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}