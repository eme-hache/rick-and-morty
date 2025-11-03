import { SyncCharactersUseCase } from "../../application/use-cases/characters/sync-characters.usecase";

export class SyncCharactersCron {
  constructor(private readonly syncCharactersUseCase: SyncCharactersUseCase) {}

  async run(): Promise<void> {
    console.log("[SYNC CHARACTERS]: Starting character sync...");

    try {
      const result = await this.syncCharactersUseCase.execute();
      console.log(`[SYNC CHARACTERS]: Synced ${result.synced} characters`);
    } catch (error) {
      console.error("[SYNC CHARACTERS]: Error syncing characters:", error);
    }
  }
}
