import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserRepository from '../repository/UserRepository';
import { User } from '../models/User';
import { UserNotFoundException } from '../exception/UserNotFoundException';
import { UserRole } from '../enum/UserRole';
import ConflictException from '../exception/ConflictException';
import UnauthorizedException from '../exception/UnauthorizedException';
import { config } from '../config';
import { assertOwnerOrAdmin, getAuthenticatedUser } from '../utils/authorization';
import { validateEmail, validateId, validateTextField } from '../utils/validation';

export class UserController {
    constructor(private readonly userRepository: UserRepository) {}

    public async saveUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const name = validateTextField(req.body.name, 'Nome', 100);
            const email = validateEmail(req.body.email);
            const password = validateTextField(req.body.password, 'Senha', 72, 8);
            const pathImageUser = validateTextField(req.body.pathImageUser, 'Imagem do usuário', 255);

            if (await this.userRepository.findOneByEmail(email)) {
                throw new ConflictException('Email já está em uso.');
            }

            const newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(await bcrypt.hash(password, 10));
            newUser.setAdmin(UserRole.USER);
            newUser.setPathImageUser(pathImageUser);

            const savedUser = await this.userRepository.save(newUser);
            res.status(201).json({ message: 'Usuário criado com sucesso', data: this.serializeUser(savedUser) });
        } catch (error) {
            next(error);
        }
    }

    public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userRepository.findAll();
            res.json(users.map((user) => this.serializeUser(user)));
        } catch (error) {
            next(error);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            assertOwnerOrAdmin(getAuthenticatedUser(req), id);

            const user = await this.userRepository.findOne(id);
            if (!user) throw new UserNotFoundException();

            res.json(this.serializeUser(user));
        } catch (error) {
            next(error);
        }
    }

    public async getUserWithImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            assertOwnerOrAdmin(getAuthenticatedUser(req), id);

            const user = await this.userRepository.getImagesByUserId(id);
            if (!user) throw new UserNotFoundException();

            res.json({
                ...this.serializeUser(user),
                images: (user.images ?? []).map((image) => ({
                    id: image.getId(),
                    pathImage: image.getPathImage(),
                    description: image.getDescription(),
                })),
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            assertOwnerOrAdmin(getAuthenticatedUser(req), id);

            const user = await this.userRepository.findOne(id);
            if (!user) throw new UserNotFoundException();

            const name = validateTextField(req.body.name, 'Nome', 100);
            const email = validateEmail(req.body.email);
            const password = validateTextField(req.body.password, 'Senha', 72, 8);
            const pathImageUser = validateTextField(req.body.pathImageUser, 'Imagem do usuário', 255);

            const emailOwner = await this.userRepository.findOneByEmail(email);
            if (emailOwner && emailOwner.getId() !== id) {
                throw new ConflictException('Email já está em uso.');
            }

            user.setName(name);
            user.setEmail(email);
            user.setPassword(await bcrypt.hash(password, 10));
            user.setPathImageUser(pathImageUser);

            const updatedUser = await this.userRepository.save(user);
            res.json({ message: 'Usuário atualizado com sucesso', data: this.serializeUser(updatedUser) });
        } catch (error) {
            next(error);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            assertOwnerOrAdmin(getAuthenticatedUser(req), id);

            if (!await this.userRepository.findOne(id)) throw new UserNotFoundException();
            await this.userRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const email = validateEmail(req.body.email);
            const password = validateTextField(req.body.password, 'Senha', 72, 1);
            const user = await this.userRepository.findOneByEmail(email);

            if (!user || !await bcrypt.compare(password, user.getPassword())) {
                throw new UnauthorizedException('Email ou senha incorretos.');
            }

            const token = jwt.sign(
                { userId: user.getId(), role: user.getAdmin() },
                config.jwtSecret,
                { expiresIn: '1h' },
            );

            res.json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            next(error);
        }
    }

    private serializeUser(user: User) {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            pathImageUser: user.getPathImageUser(),
            role: user.getAdmin(),
        };
    }
}
