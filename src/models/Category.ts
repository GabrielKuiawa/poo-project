import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, ManyToOne } from 'typeorm';
import { validateTextField } from '../utils/validation'; 
import Image from './Image'; 
import { User } from './User';

@Entity()
@Unique(['name']) 
export default class Category {

    @PrimaryGeneratedColumn('uuid')
    private id!: string;

    @Column({ nullable: false, length: 100 })
    private name!: string;


    @ManyToMany(() => Image, (image) => image.categories)
    public images!: Image[];

    @ManyToOne(() => User, (user) => user.categories)
    public user!: User;

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        validateTextField(name, 'Name', 100); 
        this.name = name;
    }
}