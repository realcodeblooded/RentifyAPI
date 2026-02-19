import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Buildings } from "./buildings.Entity";

@Entity("amenities")
export class Amenities {
    // Define columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    amenityName!: string;

    @ManyToMany(() => Buildings, building => building.amenities)
    buildings!: Buildings[];
}