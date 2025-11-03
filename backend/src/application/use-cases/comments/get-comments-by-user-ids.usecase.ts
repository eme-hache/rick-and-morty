import { LogExecutionTime } from "../../../infrastructure/decorators/log-execution-time.decorator";
import { ICommentRepository } from "../../../domain/repositories/comment.repository";
import { IComment } from "../../../domain/entities/comment.entity";

export class GetCommentsByUserIdsUseCase {
  constructor(private readonly repository: ICommentRepository) {}

  @LogExecutionTime
  async execute(userIds: IComment["userId"][]): Promise<IComment[] | null> {
    return this.repository.findAllByUserIds(userIds);
  }
}
