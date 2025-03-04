import { NextFunction, Request, Response } from 'express';
import CategoryRepository from '../repository/CategoryRepository';
import Category from '../models/Category';
import { CategoryService } from '../service/CategoryService';
import NotFoundException from '../exception/NotFoundException';

export class CategoryController {
    private categoryService: CategoryService;
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryService = new CategoryService(this.categoryRepository);
    }

    public async saveCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, userId } = req.body;
            const savedCategory = await this.categoryService.saveCategory(name, userId);
    
            res.status(201).json({
                message: "Categoria criada",
                data: {
                    id: savedCategory.getId(),
                    name: savedCategory.getName(),
                },
            });
        } catch (error: any) {
            next(error);
        }
    }
    

    public async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories: Category[] = await this.categoryRepository.findAll();

            const categoryData = categories.map((category: Category) => ({
                id: category.getId(),
                name: category.getName(),
            }));

            res.json(categoryData);
        } catch (error) {
            next(error);
        }
    }

    public async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const category: Category | null = await this.categoryRepository.findOne(id);

            if (!category) {
                throw new NotFoundException("Categoria não encontrada");
            } else {
                res.json({
                    id: category.getId(),
                    name: category.getName(),
                });
            }
        } catch (error) {
            next(error);
        }
    }

    public async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const categoryData = req.body;

            const categoryToUpdate: Category | null = await this.categoryRepository.findOne(id);
            if (!categoryToUpdate) {
                throw new NotFoundException("Categoria não encontrada");
            }

            categoryToUpdate.setName(categoryData.name);

            const updatedCategory: Category = await this.categoryRepository.save(categoryToUpdate);

            res.json({
                message: "Categoria atualizada",
                data: {
                    id: updatedCategory.getId(),
                    name: updatedCategory.getName(),
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const categoryToDelete: Category | null = await this.categoryRepository.findOne(id);

            if (!categoryToDelete) {
                throw new NotFoundException("Categoria não encontrada");
            } else {
                await this.categoryRepository.delete(id);
                res.json({ message: "Categoria deletada" });
            }
        } catch (error) {
            next(error);
        }
    }
}
