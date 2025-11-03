import {
  IComment,
  ICommentCreationAttributes,
} from "../../domain/entities/comment.entity";
import { ICommentRepository } from "../../domain/repositories/comment.repository";
import { Comment } from "../db/models/comment";

export class CommentRepositoryImpl implements ICommentRepository {
  async upsert(comment: Partial<IComment>): Promise<IComment> {
    const existingComment = await Comment.findByPk(comment.id);
    if (existingComment) {
      await existingComment.update(comment);
      return existingComment.get();
    }
    const newComment = await Comment.create(
      comment as ICommentCreationAttributes
    );
    return newComment.get();
  }

  async findByCharacterId(
    characterId: IComment["characterId"]
  ): Promise<IComment[] | null> {
    const comments = await Comment.findAll({ where: { characterId } });
    return comments.map((c) => c.get());
  }

  async findByUserId(userId: IComment["userId"]): Promise<IComment[] | null> {
    const comments = await Comment.findAll({ where: { userId } });
    return comments.map((c) => c.get());
  }

  async findAllById(ids: IComment["id"][]): Promise<IComment[] | null> {
    const comments = await Comment.findAll({ where: { id: ids } });
    return comments.map((c) => c.get());
  }

  async findAllByCharacterIds(
    ids: IComment["characterId"][]
  ): Promise<IComment[] | null> {
    const comments = await Comment.findAll({ where: { characterId: ids } });
    return comments.map((c) => c.get());
  }

  async findAllByUserIds(ids: IComment["userId"][]): Promise<IComment[] | null> {
    const comments = await Comment.findAll({ where: { userId: ids } });
    return comments.map((c) => c.get());
  }

  async delete(id: IComment["id"]): Promise<void> {
    await Comment.destroy({ where: { id } });
  }
}
