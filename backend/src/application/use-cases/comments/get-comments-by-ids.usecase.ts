import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICommentRepository } from "../../../domain/repositories/comment.repository";
import { IComment } from "../../../domain/entities/comment.entity";

export class GetCommentsByIdsUseCase {
  constructor(private readonly repository: ICommentRepository) {}

  @LogExecutionTime
  async execute(commentIds: IComment["id"][]): Promise<IComment[] | null> {
    return this.repository.findAllById(commentIds);
  }
}
