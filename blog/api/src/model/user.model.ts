import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import IEntity from "./IEntity";

export enum Role {
    Worker = "Worker",
    CompanyAdmin = "CompanyAdmin",
    SystemAdmin = "SystemAdmin",
}

@Entity()
export class User extends IEntity {
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    role: Role;
}
