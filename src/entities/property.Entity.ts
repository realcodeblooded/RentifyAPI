import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tenancies } from "./tenancy.Entity";
import { Unit } from "./units.Entity";
import { Amenity } from "./amenities.Entity";
import { User } from "./users.Entity";
import { PropertyType } from "@/types/property.Types";
import { Maintenances } from "./maintenances.Entity";

@Entity("property")
export class Property extends BaseEntity {
  /**
   * Unique identifier for the building (UUID format)
   */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100, nullable: false, type: "varchar" })
  propertyName!: string;

  @ManyToOne(() => User, (user) => user.property, { nullable: false })
  @JoinColumn({ name: "propertyManager" })
  propertyManager!: User;

  /**
   * Location(s) of the building
   * @example "123 Main St, Springfield"
   */
  @Column({ type: "varchar", length: 255 })
  locationName!: string;

  @Column({ type: "numeric" })
  x!: number;

  @Column({ type: "numeric" })
  y!: number;

  /**
   * Photo URLs of the building
   * @example ["http://example.com/photo1.jpg", "http://example.com/photo2.jpg"]
   */
  @Column({ type: "json", default: null })
  photos!: string[];

  /**
   * Type of the building
   * @example "Apartment"
   */
  @Column({ type: "enum", enum: PropertyType, nullable: false })
  type!: PropertyType;

  /**
   * Amenities available in the building
   */
  @ManyToMany(() => Amenity, (amenity) => amenity.id)
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
  @OneToMany(() => Tenancies, (tenancy) => tenancy.building)
  tenancies!: Tenancies[];

  /**
   * Units associated with the building
   */
  @OneToMany(() => Unit, (unit) => unit.building)
  units!: Unit[];
  /**
   * Maintenance requests associated with the building
   */
  @OneToMany(() => Maintenances, (maintenance) => maintenance.property)
  maintenanceRequests!: Maintenances[]
}
