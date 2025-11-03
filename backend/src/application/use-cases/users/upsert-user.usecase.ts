import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { IUser } from "../../../domain/entities/user.entity";

export class UpsertUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  @LogExecutionTime
  async execute(user: Partial<IUser>): Promise<IUser> {
    return this.repository.upsert(user);
  }
}
