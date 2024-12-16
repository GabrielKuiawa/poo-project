import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Category from './Category';  
import Image from './Image';  

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid') 
    private id!: string;

    @Column({ length: 100 })
    private name!: string;

    @Column()
    private pathImageUser!: string;

    @Column({ unique: true })
    private email!: string;

    @Column()
    private password!: string;

    @Column()
    private admin!: string;

    @OneToMany(() => Category, (category) => category.user)
    public categories!: Category[];

    @OneToMany(() => Image, (image) => image.user)
    public images!: Image[];

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPathImageUser(): string {
        return this.pathImageUser;
    }

    public setPathImageUser(pathImageUser: string): void {
        this.pathImageUser = pathImageUser;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getAdmin(): string {
        return this.admin;
    }

    public setAdmin(admin: string): void {
        this.admin = admin;
    }

    public addCategory(category: Category): void {
        if (!this.categories) {
            this.categories = [];
        }
        this.categories.push(category);
    }

    public addImage(image: Image): void {
        if (!this.images) {
            this.images = [];
        }
        this.images.push(image);
    }
}
