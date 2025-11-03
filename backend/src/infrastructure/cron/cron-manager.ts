import cron, { ScheduledTask } from "node-cron";
import { SyncCharactersCron } from "./sync-characters.cron";
import { SyncCharactersUseCase } from "../../application/use-cases/characters/sync-characters.usecase";
import { SyncCharactersRMServiceImpl } from "../services/sync-characters-rm.service.impl";
import { CharacterRepositoryImpl } from "../repositories/character.repository.impl";

export class CronManager {
  private jobs: ScheduledTask[] = [];

  start(): void {
    // 1. Instanciar dependencias (inyección manual)
    const syncCharactersService = new SyncCharactersRMServiceImpl();
    const characterRepo = new CharacterRepositoryImpl();
    const syncUseCase = new SyncCharactersUseCase(
      syncCharactersService,
      characterRepo
    );
    const syncCron = new SyncCharactersCron(syncUseCase);

    // 2. Programar cron (cada día a medianoche: '0 0 * * *')
    const job = cron.schedule("0 0 * * *", async () => {
      await syncCron.run();
    });

    this.jobs.push(job);
    console.log("[CRON]: Jobs started");
  }

  stop(): void {
    this.jobs.forEach((job) => job.stop());
    console.log("[CRON]: Jobs stopped");
  }
}
