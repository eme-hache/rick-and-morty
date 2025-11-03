import { IFavorite, IFavoriteTogglePayload } from "../entities/favorite.entity";

export abstract class IFavoriteRepository {
  abstract findByUserId(userId: number): Promise<IFavorite[] | null>;
  abstract findByCharacterId(characterId: number): Promise<IFavorite[] | null>;
  abstract toggle(
    userId: number,
    characterId: number
  ): Promise<IFavoriteTogglePayload>;
  abstract findAllById(ids: IFavorite["id"][]): Promise<IFavorite[] | null>;
  abstract findAllByCharacterIds(
    ids: IFavorite["characterId"][]
  ): Promise<IFavorite[] | null>;
  abstract findAllByUserIds(
    ids: IFavorite["userId"][]
  ): Promise<IFavorite[] | null>;
}
