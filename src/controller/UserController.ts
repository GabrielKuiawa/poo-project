import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';

import HttpException from '../exception/HttpException';
import { User } from '../models/User';

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async saveUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, admin, pathImageUser } = req.body; 
            

            const existingUser = await this.userRepository.findOneByEmail(email);
            if (existingUser) {
                throw new HttpException(400, 'Email já está em uso');
            }


            const newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(password);
            newUser.setAdmin(admin);
            newUser.setPathImageUser(pathImageUser);

            const savedUser = await this.userRepository.save(newUser);

            res.status(201).json({
                message: "Usuário criado com sucesso",
                data: {
                    id: savedUser.getId(),
                    name: savedUser.getName(),
                    email: savedUser.getEmail(),
                    admin: savedUser.getAdmin(),
                }
            });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
            }
        }
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] = await this.userRepository.findAll();

            const userData = users.map((user: User) => ({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                admin: user.getAdmin(),
            }));

            res.json(userData);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar os usuários", error: error.message });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const user: User | null = await this.userRepository.findOne(id);

            if (!user) {
                res.status(404).json({ message: "Usuário não encontrado" });
            } else {
                res.json({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    admin: user.getAdmin(),
                });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar o usuário", error: error.message });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const userData = req.body;

            const userToUpdate: User | null = await this.userRepository.findOne(id);
            if (!userToUpdate) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }

            userToUpdate.setName(userData.name);
            userToUpdate.setEmail(userData.email);
            userToUpdate.setPassword(userData.password);
            userToUpdate.setAdmin(userData.admin);
            userToUpdate.setPathImageUser(userData.pathImageUser);

            const updatedUser: User = await this.userRepository.save(userToUpdate);

            res.json({
                message: "Usuário atualizado com sucesso",
                data: {
                    id: updatedUser.getId(),
                    name: updatedUser.getName(),
                    email: updatedUser.getEmail(),
                    admin: updatedUser.getAdmin(),
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const userToDelete: User | null = await this.userRepository.findOne(id);

            if (!userToDelete) {
                res.status(404).json({ message: "Usuário não encontrado" });
            } else {
                await this.userRepository.delete(id);
                res.json({ message: "Usuário deletado com sucesso" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir o usuário", error: error.message });
        }
    }
}
