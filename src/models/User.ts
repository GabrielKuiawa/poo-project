import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Category from './Category';  
import Image from './Image';  
import { UserRole } from '../enum/UserRole';
import { validateEmail, validateTextField } from '../utils/validation';
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid') 
    private id!: string;

    @Column({ length: 100 })
    private name!: string;

    @Column({ length: 255 })
    private pathImageUser!: string;

    @Column({ unique: true })
    private email!: string;

    @Column()
    private password!: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    private admin!: UserRole;

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
        this.name = validateTextField(name, 'Nome', 100);
    }

    public getPathImageUser(): string {
        return this.pathImageUser;
    }

    public setPathImageUser(pathImageUser: string): void {
        this.pathImageUser = validateTextField(pathImageUser, 'Imagem do usuário', 255);
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = validateEmail(email);
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getAdmin(): UserRole {
        return this.admin;
    }

    public setAdmin(admin: UserRole): void {
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
