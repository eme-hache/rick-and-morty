import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICommentRepository } from "../../../domain/repositories/comment.repository";
import { IComment } from "../../../domain/entities/comment.entity";

export class UpsertCommentUseCase {
  constructor(private readonly repository: ICommentRepository) {}

  @LogExecutionTime
  async execute(comment: Partial<IComment>): Promise<IComment> {
    return this.repository.upsert(comment);
  }
}
