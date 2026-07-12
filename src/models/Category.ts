import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { validateTextField } from '../utils/validation'; 
import Image from './Image'; 
import { User } from './User';

@Entity()
@Unique(['name', 'user'])
export default class Category {

    @PrimaryGeneratedColumn('uuid')
    private id!: string;

    @Column({ nullable: false, length: 100 })
    private name!: string;

    @ManyToMany(() => Image, (image) => image.categories, { onDelete: 'CASCADE' })
    public images!: Image[];

    @ManyToOne(() => User, (user) => user.categories, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) 
    public user!: User;

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = validateTextField(name, 'Nome', 100);
    }

    public setUser(user: User): void {
        if (!user) {
            throw new Error("User cannot be null.");
        }
        this.user = user;
    }

    public getUser(): User {
        return this.user;
    }
}
