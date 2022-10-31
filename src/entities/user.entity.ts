import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserProperties } from "./schedulesUserProperties.entity";

@Entity('users')
class User {
    @Column({length: 100})
    name: string

    @Column({length: 100, unique:true})
    email: string

    @Column({length: 120})
    password: string

    @Column()
    isAdm: boolean

    @Column({nullable: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @OneToMany(() => UserProperties, userproperties => userproperties.user)
    userproperties: UserProperties[]
}

export { User }