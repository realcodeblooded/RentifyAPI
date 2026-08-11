import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.Entity";

@Entity("amenities")
export class Amenity {
    // Define columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    amenityName!: string;

    @ManyToMany(() => Property, property => property.amenities)
    buildings!: Property[];
}