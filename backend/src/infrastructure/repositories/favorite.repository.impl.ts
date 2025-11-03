import { IFavoriteRepository } from "../../domain/repositories/favorite.repository";
import { Character } from "../db/models/character";
import { Favorite } from "../db/models/favorite";
import { sequelize } from "../db/sequelize";
import {
  IFavorite,
  IFavoriteCreationAttributes,
  IFavoriteTogglePayload,
} from "../../domain/entities/favorite.entity";

export class FavoriteRepositoryImpl implements IFavoriteRepository {
  async toggle(
    userId: IFavorite["userId"],
    characterId: IFavorite["characterId"]
  ): Promise<IFavoriteTogglePayload> {
    const favorite = await Favorite.findOne({ where: { userId, characterId } });
    if (favorite) {
      await favorite.destroy();
      await Character.decrement("favoritesCount", {
        where: { id: characterId },
      });
      return { isFavorite: false, favorite: null };
    } else {
      const newFavorite = await Favorite.create({
        userId,
        characterId,
      } as IFavoriteCreationAttributes);
      await Character.increment("favoritesCount", {
        where: { id: characterId },
      });
      return { isFavorite: true, favorite: newFavorite.get({ plain: true }) };
    }
  }

  async findByUserId(userId: IFavorite["userId"]): Promise<IFavorite[] | null> {
    const favorites = await Favorite.findAll({ where: { userId } });
    return favorites.map((f) => f.get({ plain: true }));
  }

  async findByCharacterId(
    characterId: IFavorite["characterId"]
  ): Promise<IFavorite[] | null> {
    const favorites = await Favorite.findAll({ where: { characterId } });
    return favorites.map((f) => f.get({ plain: true }));
  }

  async findAllById(ids: IFavorite["id"][]): Promise<IFavorite[] | null> {
    const favorites = await Favorite.findAll({ where: { id: ids } });
    return favorites.map((f) => f.get({ plain: true }));
  }

  async findAllByCharacterIds(
    ids: IFavorite["characterId"][]
  ): Promise<IFavorite[] | null> {
    const favorites = await Favorite.findAll({ where: { characterId: ids } });
    return favorites.map((f) => f.get({ plain: true }));
  }

  async findAllByUserIds(
    ids: IFavorite["userId"][]
  ): Promise<IFavorite[] | null> {
    const favorites = await Favorite.findAll({ where: { userId: ids } });
    return favorites.map((f) => f.get({ plain: true }));
  }
}
