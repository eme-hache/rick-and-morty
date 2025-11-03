import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICharacterRepository } from "../../../domain/repositories/character.repository";
import { ICharacter } from "../../../domain/entities/character.entity";

export class GetCharactersByIdsUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  @LogExecutionTime
  async execute(ids: ICharacter["id"][]): Promise<ICharacter[] | null> {
    return this.repository.findAllById(ids);
  }
}
