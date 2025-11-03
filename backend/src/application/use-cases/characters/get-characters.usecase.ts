import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICharacterRepository } from "../../../domain/repositories/character.repository";
import { RedisCache } from "../../../infrastructure/decorators/redis-cache.decorator";
import { ICharacter } from "../../../domain/entities/character.entity";

export class GetCharactersUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  @LogExecutionTime
  @RedisCache({
    keyPrefix: "characters",
    keyBuilder: () => "*",
    condition: (args) => args.length === 0,
  })
  async execute(filters?: Partial<ICharacter>): Promise<ICharacter[]> {
    return this.repository.findAll(filters);
  }
}
