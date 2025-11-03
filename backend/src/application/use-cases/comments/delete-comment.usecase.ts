import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICommentRepository } from "../../../domain/repositories/comment.repository";
import { IComment } from "../../../domain/entities/comment.entity";

export class DeleteCommentUseCase {
  constructor(private readonly repository: ICommentRepository) {}

  @LogExecutionTime
  async execute(commentId: IComment["id"]): Promise<void> {
    await this.repository.delete(commentId);
  }
}
