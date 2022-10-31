import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 20 })
  zipCode: string;

  @Column({ length: 10 })
  number: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;
}

export { Address };
