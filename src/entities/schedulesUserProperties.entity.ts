import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
class UserProperties {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({type: 'date'})
    date: Date

    @Column({type: 'time'})
    hour: Date

    @ManyToOne(() => Property)
    property: Property

    @ManyToOne(() => User)
    user: User  
}

export {UserProperties}