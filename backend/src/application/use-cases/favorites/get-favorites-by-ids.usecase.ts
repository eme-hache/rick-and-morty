import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IFavoriteRepository } from "../../../domain/repositories/favorite.repository";
import { IFavorite } from "../../../domain/entities/favorite.entity";

export class GetFavoritesByIdsUseCase {
  constructor(private readonly repository: IFavoriteRepository) {}

  @LogExecutionTime
  async execute(favoriteIds: IFavorite["id"][]): Promise<IFavorite[] | null> {
    return this.repository.findAllById(favoriteIds);
  }
}
