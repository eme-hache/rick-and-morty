import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICharacterRepository } from "../../../domain/repositories/character.repository";
import { RedisCache } from "../../../infrastructure/decorators/redis-cache.decorator";
import { ICharacter } from "../../../domain/entities/character.entity";

export class GetCharacterUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  @LogExecutionTime
  @RedisCache({
    keyPrefix: "character",
    keyBuilder: (id) => id.toString(),
  })
  async execute(characterId: ICharacter["id"]): Promise<ICharacter | null> {
    return this.repository.findById(characterId);
  }
}
