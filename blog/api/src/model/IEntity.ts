import { Column, PrimaryGeneratedColumn } from "typeorm";

export default class IEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    isDeleted: boolean = false;
}
