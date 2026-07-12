import { NextFunction, Request, Response } from 'express';
import CategoryRepository from '../repository/CategoryRepository';
import Category from '../models/Category';
import { CategoryService } from '../service/CategoryService';
import NotFoundException from '../exception/NotFoundException';
import { assertOwnerOrAdmin, getAuthenticatedUserId } from '../utils/authorization';
import { validateId, validateTextField } from '../utils/validation';

export class CategoryController {
    private readonly categoryService: CategoryService;

    constructor(private readonly categoryRepository: CategoryRepository) {
        this.categoryService = new CategoryService(categoryRepository);
    }

    public async saveCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const name = validateTextField(req.body.name, 'Nome', 100);
            const category = await this.categoryService.saveCategory(name, getAuthenticatedUserId(req));
            res.status(201).json({ message: 'Categoria criada', data: this.serializeCategory(category) });
        } catch (error) {
            next(error);
        }
    }

    public async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await this.categoryRepository.findAll();
            res.json(categories.map((category) => this.serializeCategory(category)));
        } catch (error) {
            next(error);
        }
    }

    public async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const category = await this.categoryRepository.findOne(validateId(req.params.id));
            if (!category) throw new NotFoundException('Categoria não encontrada.');
            res.json(this.serializeCategory(category));
        } catch (error) {
            next(error);
        }
    }

    public async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            const category = await this.categoryRepository.findOneWithUser(id);
            if (!category) throw new NotFoundException('Categoria não encontrada.');

            assertOwnerOrAdmin(req, category.getUser().getId());
            category.setName(validateTextField(req.body.name, 'Nome', 100));
            const updated = await this.categoryRepository.save(category);
            res.json({ message: 'Categoria atualizada', data: this.serializeCategory(updated) });
        } catch (error) {
            next(error);
        }
    }

    public async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            const category = await this.categoryRepository.findOneWithUser(id);
            if (!category) throw new NotFoundException('Categoria não encontrada.');

            assertOwnerOrAdmin(req, category.getUser().getId());
            await this.categoryRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    private serializeCategory(category: Category) {
        return { id: category.getId(), name: category.getName() };
    }
}
