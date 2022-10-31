import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Property } from "./property.entity";

@Entity("categories")
class Categories {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Property, properties => properties.category)
  properties: Property[]
}

export { Categories };
