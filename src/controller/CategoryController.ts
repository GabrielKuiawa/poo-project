import { Request, Response } from 'express';
import CategoryRepository from '../repository/CategoryRepository';
import Category from '../models/Category';
import { CategoryService } from '../service/CategoryService';
import HttpException from '../exception/HttpException';

export class CategoryController {
    private categoryService: CategoryService;
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryService = new CategoryService(this.categoryRepository);
    }

    public async saveCategory(req: Request, res: Response): Promise<void> {
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
        } catch (error) {
            if (error instanceof HttpException) 
                res.status(error.status).json({ message: error.message });
            else
                res.status(500).json({ message: "Erro ao criar categoria", error: error.message });
        }
    }

    public async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories: Category[] = await this.categoryRepository.findAll();

            const categoryData = categories.map((category: Category) => ({
                id: category.getId(),
                name: category.getName(),
            }));

            res.json(categoryData);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar categorias", error: error.message });
        }
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const category: Category | null = await this.categoryRepository.findOne(id);

            if (!category) {
                res.status(404).json({ message: "Categoria não encontrada" });
            } else {
                res.json({
                    id: category.getId(),
                    name: category.getName(),
                });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar categoria", error: error.message });
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const categoryData = req.body;

            const categoryToUpdate: Category | null = await this.categoryRepository.findOne(id);
            if (!categoryToUpdate) {
                res.status(404).json({ message: "Categoria não encontrada" });
                return;
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
            res.status(500).json({ message: "Erro ao atualizar categoria", error: error.message });
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const categoryToDelete: Category | null = await this.categoryRepository.findOne(id);

            if (!categoryToDelete) {
                res.status(404).json({ message: "Categoria não encontrada" });
            } else {
                await this.categoryRepository.delete(id);
                res.json({ message: "Categoria deletada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar categoria", error: error.message });
        }
    }
}
