import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICommentRepository } from "../../../domain/repositories/comment.repository";
import { IComment } from "../../../domain/entities/comment.entity";

export class GetCommentsByCharacterIdsUseCase {
  constructor(private readonly repository: ICommentRepository) {}

  @LogExecutionTime
  async execute(
    characterIds: IComment["characterId"][]
  ): Promise<IComment[] | null> {
    return this.repository.findAllByCharacterIds(characterIds);
  }
}
