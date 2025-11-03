import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { IFavoriteRepository } from "../../../domain/repositories/favorite.repository";
import { IFavorite } from "../../../domain/entities/favorite.entity";

export class GetFavoritesByCharacterIdsUseCase {
  constructor(private readonly repository: IFavoriteRepository) {}

  @LogExecutionTime
  async execute(
    characterIds: IFavorite["characterId"][]
  ): Promise<IFavorite[] | null> {
    return this.repository.findAllByCharacterIds(characterIds);
  }
}
