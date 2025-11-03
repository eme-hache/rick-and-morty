import { IUser } from "../entities/user.entity";

export abstract class IUserRepository {
  abstract upsert(user: Partial<IUser>): Promise<IUser>;
  abstract delete(id: IUser["id"]): Promise<void>;
  abstract findById(id: IUser["id"]): Promise<IUser | null>;
  abstract findAllById(ids: IUser["id"][]): Promise<IUser[] | null>;
}
