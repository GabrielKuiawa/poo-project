import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import {
  getAuthenticatedUser,
  getAuthenticatedUserId,
} from "../utils/authorization";
import {
  validateEmail,
  validateId,
  validatePagination,
  validateTextField,
} from "../utils/validation";
import { UserService } from "../service/UserService";
import { serializePaginationMeta } from "../utils/pagination";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async saveUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const name = validateTextField(req.body.name, "Nome", 100);
      const email = validateEmail(req.body.email);
      const password = validateTextField(req.body.password, "Senha", 72, 8);
      const pathImageUser = validateTextField(
        req.body.pathImageUser,
        "Imagem do usuário",
        255,
      );

      const user = await this.userService.saveUser(
        name,
        email,
        password,
        pathImageUser,
      );

      res.status(201).json({
        message: "Usuário criado com sucesso",
        data: this.serializeUser(user),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.userService.getUsers(
        validatePagination(req.query.page, req.query.limit),
      );
      res.json({
        data: result.data.map((user) => this.serializeUser(user)),
        meta: serializePaginationMeta(req, result.meta),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);
      const user = await this.userService.getUserById(
        id,
        getAuthenticatedUser(req),
      );

      res.json(this.serializeUser(user));
    } catch (error) {
      next(error);
    }
  }

  public async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authenticatedUser = getAuthenticatedUser(req);
      const user = await this.userService.getUserById(
        getAuthenticatedUserId(req),
        authenticatedUser,
      );

      res.json(this.serializeUser(user));
    } catch (error) {
      next(error);
    }
  }

  public async getUserWithImages(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);
      const result = await this.userService.getUserWithImages(
        id,
        getAuthenticatedUser(req),
        validatePagination(req.query.page, req.query.limit),
      );

      res.json({
        ...this.serializeUser(result.user),
        images: {
          data: result.images.data.map((image) => ({
            id: image.getId(),
            title: image.getTitle(),
            pathImage: image.getPathImage(),
            description: image.getDescription(),
          })),
          meta: serializePaginationMeta(req, result.images.meta),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);

      const name = validateTextField(req.body.name, "Nome", 100);
      const email = validateEmail(req.body.email);
      const password = validateTextField(req.body.password, "Senha", 72, 8);
      const pathImageUser = validateTextField(
        req.body.pathImageUser,
        "Imagem do usuário",
        255,
      );

      const updatedUser = await this.userService.updateUser(
        id,
        name,
        email,
        password,
        pathImageUser,
        getAuthenticatedUser(req),
      );
      res.json({
        message: "Usuário atualizado com sucesso",
        data: this.serializeUser(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);
      await this.userService.deleteUser(id, getAuthenticatedUser(req));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const email = validateEmail(req.body.email);
      const password = validateTextField(req.body.password, "Senha", 72, 1);
      const token = await this.userService.login(email, password);

      res.json({ message: "Login bem-sucedido", token });
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
