import { UserRole } from "../enum/UserRole";
import ConflictException from "../exception/ConflictException";
import UnauthorizedException from "../exception/UnauthorizedException";
import { UserNotFoundException } from "../exception/UserNotFoundException";
import { User } from "../models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import UserRepository from "../repository/UserRepository";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import { assertOwnerOrAdmin } from "../utils/authorization";
import { config } from "../config";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async saveUser(
    name: string,
    email: string,
    password: string,
    pathImageUser: string,
  ): Promise<User> {
    if (await this.userRepository.findOneByEmail(email)) {
      throw new ConflictException("Email já está em uso.");
    }

    const newUser = new User();
    newUser.setName(name);
    newUser.setEmail(email);
    newUser.setPassword(await bcrypt.hash(password, 10));
    newUser.setAdmin(UserRole.USER);
    newUser.setPathImageUser(pathImageUser);

    return this.userRepository.save(newUser);
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async getUserById(
    id: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<User> {
    assertOwnerOrAdmin(authenticatedUser, id);

    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public async getUserWithImages(
    id: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<User> {
    assertOwnerOrAdmin(authenticatedUser, id);

    const user = await this.userRepository.getImagesByUserId(id);
    if (!user) throw new UserNotFoundException();

    return user;
  }

  public async updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    pathImageUser: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<User> {
    assertOwnerOrAdmin(authenticatedUser, id);

    const user = await this.userRepository.findOne(id);
    if (!user) throw new UserNotFoundException();

    const emailOwner = await this.userRepository.findOneByEmail(email);
    if (emailOwner && emailOwner.getId() !== id) {
      throw new ConflictException("Email já está em uso.");
    }

    user.setName(name);
    user.setEmail(email);
    user.setPassword(await bcrypt.hash(password, 10));
    user.setPathImageUser(pathImageUser);

    return this.userRepository.save(user);
  }

  public async deleteUser(
    id: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<void> {
    assertOwnerOrAdmin(authenticatedUser, id);

    if (!(await this.userRepository.findOne(id))) {
      throw new UserNotFoundException();
    }

    await this.userRepository.delete(id);
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.getPassword()))) {
      throw new UnauthorizedException("Email ou senha incorretos.");
    }

    return jwt.sign(
      { userId: user.getId(), role: user.getAdmin() },
      config.jwtSecret,
      { expiresIn: "1h" },
    );
  }
}
