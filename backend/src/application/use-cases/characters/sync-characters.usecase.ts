import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ISyncCharactersService } from "../../../domain/services/sync-characters.service";
import { ICharacterRepository } from "../../../domain/repositories/character.repository";

export class SyncCharactersUseCase {
  constructor(
    private readonly syncCharactersService: ISyncCharactersService,
    private readonly characterRepo: ICharacterRepository
  ) {}

  @LogExecutionTime
  async execute(): Promise<{ synced: number }> {
    const charactersFromApi = await this.syncCharactersService.syncCharacters();
    await this.characterRepo.upsertMany(charactersFromApi);

    return { synced: charactersFromApi.length };
  }
}
