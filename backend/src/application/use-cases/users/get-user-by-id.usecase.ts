import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { IUser } from "../../../domain/entities/user.entity";

export class GetUserByIdUseCase {
  constructor(private readonly repository: IUserRepository) {}

  @LogExecutionTime
  async execute(userId: IUser["id"]): Promise<IUser | null> {
    return this.repository.findById(userId);
  }
}
