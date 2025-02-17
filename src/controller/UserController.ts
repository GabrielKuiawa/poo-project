import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';
import * as bcrypt from 'bcryptjs'; 
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { UserNotFoundException } from '../exception/UserNotFoundException';
import { UserRole } from '../enum/UserRole';
import BadRequestException from '../exception/BadRequestException';

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async saveUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password, admin, pathImageUser } = req.body;
    
            if (!Object.values(UserRole).includes(admin)) {
                throw new BadRequestException("Valor de 'admin' inválido. Deve ser 'user' ou 'admin'.");
            }
    
            const existingUser = await this.userRepository.findOneByEmail(email);
            if (existingUser) {
                throw new UserNotFoundException('Email já está em uso');
            }

            const newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser.setPassword(hashedPassword);
            newUser.setAdmin(admin as UserRole);  
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
            next(error);
        }
    }

    public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            next(error);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const user: User | null = await this.userRepository.findOne(id);
            if (!user) {
                throw new UserNotFoundException();
            } else {
                res.json({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    admin: user.getAdmin(),
                });
            }
        } catch (error) {
            next(error);
        }

    }

    public async getUserWithImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
    
            if (!id) {
                throw new BadRequestException("ID do usuário é obrigatório.");
            }
            
            const user = await this.userRepository.getImagesByUserId(id);
            
            if (!user) {
                throw new UserNotFoundException();
            }
            
            res.json({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                images: user.images
            });
        } catch (error) {
            next(error);
        }
    }
    
    

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const userData = req.body;
            const userToUpdate: User | null = await this.userRepository.findOne(id);

            if (!userToUpdate) {
                throw new UserNotFoundException();
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
            next(error);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const userToDelete: User | null = await this.userRepository.findOne(id);

            if (!userToDelete) {
                throw new UserNotFoundException();
            } else {
                await this.userRepository.delete(id);
                res.json({ message: "Usuário deletado com sucesso" });
            }
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new UserNotFoundException('Email e senha são obrigatórios');
            }
            const user = await this.userRepository.findOneByEmail(email);
            if (!user) {
                throw new UserNotFoundException('Usuário ou senha incorretos');
            }
            const isPasswordValid = await bcrypt.compare(password, user.getPassword());
            if (!isPasswordValid) {
                throw new UserNotFoundException('Usuário ou senha incorretos');
            }

            const secret = process.env.JWT_SECRET || 'default_secret'; 
            const token = jwt.sign(
                { userId: user.getId() },
                secret, 
                { expiresIn: '1h' }
            );
            res.json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            next(error);
        }
    }
}
