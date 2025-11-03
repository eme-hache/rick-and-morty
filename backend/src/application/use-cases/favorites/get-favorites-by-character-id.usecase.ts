import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IFavoriteRepository } from "../../../domain/repositories/favorite.repository";
import { IFavorite } from "../../../domain/entities/favorite.entity";

export class GetFavoritesByCharacterIdUseCase {
  constructor(private readonly repository: IFavoriteRepository) {}

  @LogExecutionTime
  async execute(
    characterId: IFavorite["characterId"]
  ): Promise<IFavorite[] | null> {
    return this.repository.findByCharacterId(characterId);
  }
}
