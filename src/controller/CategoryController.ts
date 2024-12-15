import { Request, Response } from "express";
import Category from "../models/Category";
import CategoryRepository from '../repository/CategoryRepository';

export default class CategoryController {

    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    public saveCategory(req: Request, res: Response): void {
        const category = req.body;
        this.categoryRepository.save(category);
        res.status(201).send('Category created');
    }
    public getCategories(req: Request, res: Response): void {
        const categories = this.categoryRepository.findAll();
        res.json(categories);
    }
}