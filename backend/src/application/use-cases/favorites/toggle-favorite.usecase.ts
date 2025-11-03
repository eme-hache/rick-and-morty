import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { InvalidateRedisCache } from "../../../infrastructure/decorators/redis-cache.decorator";
import { IFavoriteRepository } from "../../../domain/repositories/favorite.repository";
import {
  IFavoriteTogglePayload,
  IFavorite,
} from "../../../domain/entities/favorite.entity";

export class ToggleFavoriteUseCase {
  constructor(private readonly repository: IFavoriteRepository) {}

  @LogExecutionTime
  @InvalidateRedisCache({
    keyPrefix: "character",
    keyBuilder: (_, characterId) => characterId.toString(),
  })
  async execute(
    userId: IFavorite["userId"],
    characterId: IFavorite["characterId"]
  ): Promise<IFavoriteTogglePayload> {
    return this.repository.toggle(userId, characterId);
  }
}
