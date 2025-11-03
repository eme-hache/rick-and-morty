import {
  IUser,
  IUserCreationAttributes,
} from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../db/models/user";

export class UserRepositoryImpl implements IUserRepository {
  async upsert(user: Partial<IUser>): Promise<IUser> {
    const existingUser = await User.findByPk(user.id);
    if (existingUser) {
      await existingUser.update(user);
      return existingUser.get();
    }
    const newUser = await User.create(user as IUserCreationAttributes);
    return newUser.get();
  }

  async delete(id: IUser["id"]): Promise<void> {
    await User.destroy({ where: { id } });
  }

  async findById(id: IUser["id"]): Promise<IUser | null> {
    return User.findByPk(id);
  }

  async findAllById(ids: IUser["id"][]): Promise<IUser[] | null> {
    const users = await User.findAll({ where: { id: ids } });
    return users.map((user) => user.get({ plain: true }));
  }
}
