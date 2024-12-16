import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
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

    @ManyToOne(() => User, (user) => user.categories, { nullable: false })
    @JoinColumn({ name: 'userId' }) 
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

    public setUser(user: User): void {
        if (!user) {
            throw new Error("User cannot be null.");
        }
        this.user = user;
    }
}