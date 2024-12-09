import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id:string;

    @Column()
    private name:string;

    @Column()
    private pathImageUser:string;

    @Column()
    private email:string;

    @Column()
    private password:string;

    @Column()
    private admin:string;

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

}
