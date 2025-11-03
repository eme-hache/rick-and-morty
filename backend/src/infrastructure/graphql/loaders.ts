import DataLoader from "dataloader";
import { container } from "../di/container";
import { IComment } from "../../domain/entities/comment.entity";
import { IFavorite } from "../../domain/entities/favorite.entity";
import { IUser } from "../../domain/entities/user.entity";
import { ICharacter } from "../../domain/entities/character.entity";

export function createLoaders() {
  return {
    usersByIds: new DataLoader(async (userIds: readonly IUser["id"][]) => {
      const users = await container.getUsersByIdsUseCase.execute(
        userIds as IUser["id"][]
      );

      const map = new Map(users?.map((user) => [user.id, user]));

      return userIds.map((id) => map.get(id));
    }),
    charactersByIds: new DataLoader(
      async (characterIds: readonly ICharacter["id"][]) => {
        const characters = await container.getCharactersByIdsUseCase.execute(
          characterIds as ICharacter["id"][]
        );

        const map = new Map(
          characters?.map((character) => [character.id, character])
        );

        return characterIds.map((id) => map.get(id));
      }
    ),
    commentsByIds: new DataLoader(
      async (commentIds: readonly IComment["id"][]) => {
        const comments = await container.getCommentsByIdsUseCase.execute(
          commentIds as IComment["id"][]
        );

        const map = new Map(comments?.map((comment) => [comment.id, comment]));

        return commentIds.map((id) => map.get(id));
      }
    ),
    favoritesByIds: new DataLoader(
      async (favoriteIds: readonly IFavorite["id"][]) => {
        const favorites = await container.getFavoritesByIdsUseCase.execute(
          favoriteIds as IFavorite["id"][]
        );

        const map = new Map(
          favorites?.map((favorite) => [favorite.id, favorite])
        );

        return favoriteIds.map((id) => map.get(id));
      }
    ),
    commentsByCharacterIds: new DataLoader(
      async (characterIds: readonly ICharacter["id"][]) => {
        const allComments =
          await container.getCommentsByCharacterIdsUseCase.execute(
            characterIds as ICharacter["id"][]
          );

        const groupedComments = new Map<ICharacter["id"], IComment[]>();
        (allComments ?? []).forEach((comment) => {
          const id = (comment as any).characterId;
          if (!groupedComments.has(id)) {
            groupedComments.set(id, []);
          }
          groupedComments.get(id)!.push(comment);
        });

        return characterIds.map((id) => groupedComments.get(id) ?? []);
      }
    ),
    commentsByUserIds: new DataLoader(
      async (userIds: readonly IUser["id"][]) => {
        const allComments = await container.getCommentsByUserIdsUseCase.execute(
          userIds as IUser["id"][]
        );

        const groupedComments = new Map<IUser["id"], IComment[]>();
        (allComments ?? []).forEach((comment) => {
          const id = (comment as any).userId;
          if (!groupedComments.has(id)) {
            groupedComments.set(id, []);
          }
          groupedComments.get(id)!.push(comment);
        });

        return userIds.map((id) => groupedComments.get(id) ?? []);
      }
    ),
    favoritesByCharacterIds: new DataLoader(
      async (characterIds: readonly ICharacter["id"][]) => {
        const allFavorites =
          await container.getFavoritesByCharacterIdsUseCase.execute(
            characterIds as ICharacter["id"][]
          );

        const groupedFavorites = new Map<ICharacter["id"], IFavorite[]>();
        (allFavorites ?? []).forEach((favorite) => {
          const id = (favorite as any).characterId;
          if (!groupedFavorites.has(id)) {
            groupedFavorites.set(id, []);
          }
          groupedFavorites.get(id)!.push(favorite);
        });

        return characterIds.map((id) => groupedFavorites.get(id) ?? []);
      }
    ),
    favoritesByUserIds: new DataLoader(
      async (userIds: readonly IUser["id"][]) => {
        const allFavorites =
          await container.getFavoritesByUserIdsUseCase.execute(
            userIds as IUser["id"][]
          );

        const groupedFavorites = new Map<IUser["id"], IFavorite[]>();
        (allFavorites ?? []).forEach((favorite) => {
          const id = (favorite as any).userId;
          if (!groupedFavorites.has(id)) {
            groupedFavorites.set(id, []);
          }
          groupedFavorites.get(id)!.push(favorite);
        });

        return userIds.map((id) => groupedFavorites.get(id) ?? []);
      }
    ),
  };
}
