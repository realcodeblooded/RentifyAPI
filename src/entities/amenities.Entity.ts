import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Building } from "./building.Entity";

@Entity("amenities")
export class Amenities {
    // Define columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    amenityName!: string;

    @ManyToMany(() => Building, building => building.amenities)
    buildings!: Building[];
}