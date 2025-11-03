import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICommentRepository } from "../../../domain/repositories/comment.repository";
import { IComment } from "../../../domain/entities/comment.entity";

export class GetCommentsByCharacterIdUseCase {
  constructor(private readonly repository: ICommentRepository) {}

  @LogExecutionTime
  async execute(
    characterId: IComment["characterId"]
  ): Promise<IComment[] | null> {
    return this.repository.findByCharacterId(characterId);
  }
}
