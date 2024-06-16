import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user_profile"})
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    dob: string;
}