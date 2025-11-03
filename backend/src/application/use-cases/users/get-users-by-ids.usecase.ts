import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { IUser } from "../../../domain/entities/user.entity";

export class GetUsersByIdsUseCase {
  constructor(private readonly repository: IUserRepository) {}

  @LogExecutionTime
  async execute(userIds: IUser["id"][]): Promise<IUser[] | null> {
    return this.repository.findAllById(userIds);
  }
}
