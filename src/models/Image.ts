import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { validateTextField } from '../utils/validation'; 
import Category from './Category'; 
import { User } from './User';
@Entity()
export default class Image {

    @PrimaryGeneratedColumn('uuid')
    private id!: string;

    @Column()
    private pathImage!: string;

    @Column()
    private description!: string;


    @ManyToMany(() => Category, (category) => category.images)
    @JoinTable() 
    public categories!: Category[];

    public getId(): string {
        return this.id;
    }

    @ManyToOne(() => User, (user) => user.images)
    public user!: User;

    public setPathImage(pathImage: string): void {
        validateTextField(pathImage, 'Path Image', 255); 
        this.pathImage = pathImage;
    }

    public getPathImage(): string {
        return this.pathImage;
    }

    public setDescription(description: string): void {
        validateTextField(description, 'Description', 500); 
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }

    public addCategory(category: Category): void {
        if (!this.categories) {
            this.categories = [];
        }
        if (!this.categories.includes(category)) {
            this.categories.push(category); 
        }
    }


    public getCategories(): Category[] {
        return this.categories;
    }
}
