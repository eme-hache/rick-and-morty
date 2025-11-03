import { IComment } from "../entities/comment.entity";

export abstract class ICommentRepository {
  abstract findByUserId(userId: IComment["userId"]): Promise<IComment[] | null>;
  abstract findByCharacterId(
    characterId: IComment["characterId"]
  ): Promise<IComment[] | null>;
  abstract upsert(comment: Partial<IComment>): Promise<IComment>;
  abstract delete(id: IComment["id"]): Promise<void>;
  abstract findAllById(ids: IComment["id"][]): Promise<IComment[] | null>;
  abstract findAllByCharacterIds(
    ids: IComment["characterId"][]
  ): Promise<IComment[] | null>;
  abstract findAllByUserIds(
    ids: IComment["userId"][]
  ): Promise<IComment[] | null>;
}
