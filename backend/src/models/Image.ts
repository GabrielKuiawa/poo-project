import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { validateTextField } from "../utils/validation";
import Category from "./Category";
import { User } from "./User";
@Entity()
export default class Image {
  @PrimaryGeneratedColumn("uuid")
  private id!: string;

  @Column({ length: 255 })
  private pathImage!: string;

  @Column({ length: 150 })
  private title!: string;

  @Column({ length: 500 })
  private description!: string;

  @ManyToMany(() => Category, (category) => category.images)
  @JoinTable()
  public categories!: Category[];

  public getId(): string {
    return this.id;
  }

  @ManyToOne(() => User, (user) => user.images, {
    nullable: false,
    onDelete: "CASCADE",
  })
  public user!: User;

  public setPathImage(pathImage: string): void {
    this.pathImage = validateTextField(pathImage, "Caminho da imagem", 255);
  }

  public getPathImage(): string {
    return this.pathImage;
  }

  public setTitle(title: string): void {
    this.title = validateTextField(title, "Título", 150);
  }

  public getTitle(): string {
    return this.title;
  }

  public setDescription(description: string): void {
    this.description = validateTextField(description, "Descrição", 500);
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
    return this.categories ?? [];
  }

  public setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  public getUser(): User {
    return this.user;
  }
}
