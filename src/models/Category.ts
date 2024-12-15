import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class Category {
    
    @PrimaryGeneratedColumn()
    private id!: string; 
    
    @Column()
    private name: string;

    public getId() : string {
        return this.id;
    }
    

    public getName() : string {
        return this.name
    }
    
    
    public setName(name : string) {
        this.name = name;
    }
}