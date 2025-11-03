import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IFavoriteRepository } from "../../../domain/repositories/favorite.repository";
import { IFavorite } from "../../../domain/entities/favorite.entity";

export class GetFavoritesByUserIdUseCase {
  constructor(private readonly repository: IFavoriteRepository) {}

  @LogExecutionTime
  async execute(userId: IFavorite["userId"]): Promise<IFavorite[] | null> {
    return this.repository.findByUserId(userId);
  }
}
