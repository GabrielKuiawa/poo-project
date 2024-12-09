import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Image {

    @PrimaryGeneratedColumn()
    private id!: string;

    @Column()
    private pathImage!: string;

    @Column()
    private description!: string;
    
    @Column()
    private categoryId!: string;

    public getId() : string {
        return this.id;
    }

    public setPathImage(setPathImage:string) {
        this.pathImage = setPathImage;
    }

    public getPathImage() : string {
        return this.pathImage;
    }
    
    public setDescription(description:string) {
        this.description = description;
    }

    public getDescription() : string {
        return this.description;
    }

    public setCategoryId(categoryId:string) {
        this.categoryId = categoryId;
    }

    public getCategoryId() : string {
        return this.categoryId;
    }
    
}