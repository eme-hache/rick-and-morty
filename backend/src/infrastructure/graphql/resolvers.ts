import {
  ICharacter,
  ICharacterFilter,
} from "../../domain/entities/character.entity";
import {
  IComment,
  ICommentCreationAttributes,
} from "../../domain/entities/comment.entity";
import { IFavorite } from "../../domain/entities/favorite.entity";
import {
  IUser,
  IUserCreationAttributes,
} from "../../domain/entities/user.entity";
import { container } from "../di/container";

export const resolvers = {
  // ==================== Query ====================
  Query: {
    characters: async (
      _: unknown,
      { filter }: { filter: ICharacterFilter }
    ) => {
      return container.getCharactersUseCase.execute(filter ?? {});
    },
    character: async (_: unknown, { id }: { id: ICharacter["id"] }) => {
      return container.getCharacterUseCase.execute(Number(id));
    },
    commentsByCharacterId: async (
      _: unknown,
      { characterId }: { characterId: ICharacter["id"] }
    ) => {
      return container.getCommentByCharacterIdUseCase.execute(
        Number(characterId)
      );
    },
    commentsByUserId: async (
      _: unknown,
      { userId }: { userId: IUser["id"] }
    ) => {
      return container.getCommentByUserIdUseCase.execute(Number(userId));
    },
    favoritesByCharacterId: async (
      _: unknown,
      { characterId }: { characterId: ICharacter["id"] }
    ) => {
      return container.getFavoritesByCharacterIdUseCase.execute(
        Number(characterId)
      );
    },
    favoritesByUserId: async (
      _: unknown,
      { userId }: { userId: IUser["id"] }
    ) => {
      return container.getFavoritesByUserIdUseCase.execute(Number(userId));
    },
  },
  // ==================== Mutation ====================
  Mutation: {
    deleteComment: async (_: unknown, { id }: { id: IComment["id"] }) => {
      return container.deleteCommentUseCase.execute(Number(id));
    },
    upsertComment: async (
      _: unknown,
      { comment }: { comment: ICommentCreationAttributes }
    ) => {
      return container.upsertCommentUseCase.execute(comment);
    },
    toggleFavorite: async (
      _: unknown,
      {
        userId,
        characterId,
      }: { userId: IUser["id"]; characterId: ICharacter["id"] }
    ) => {
      return container.toggleFavoriteUseCase.execute(
        Number(userId),
        Number(characterId)
      );
    },
    deleteUser: async (_: unknown, { id }: { id: IUser["id"] }) => {
      return container.deleteUserUseCase.execute(Number(id));
    },
    upsertUser: async (
      _: unknown,
      { user }: { user: IUserCreationAttributes }
    ) => {
      return container.upsertUserUseCase.execute(user);
    },
  },
  // ==================== Field Resolvers ====================
  Character: {
    comments: async (parent: ICharacter, _: unknown, ctx: any) => {
      return ctx.loaders.commentsByCharacterIds.load(parent.id);
    },
    favorites: async (parent: ICharacter, _: unknown, ctx: any) => {
      return ctx.loaders.favoritesByCharacterIds.load(parent.id);
    },
  },
  User: {
    comments: async (parent: IUser, _: unknown, ctx: any) => {
      return ctx.loaders.commentsByUserIds.load(parent.id);
    },
    favorites: async (parent: IUser, _: unknown, ctx: any) => {
      return ctx.loaders.favoritesByUserIds.load(parent.id);
    },
  },
  Comment: {
    user: async (parent: IComment, _: unknown, ctx: any) => {
      return ctx.loaders.usersByIds.load(parent.userId);
    },
    character: async (parent: IComment, _: unknown, ctx: any) => {
      return ctx.loaders.charactersByIds.load(parent.characterId);
    },
  },
  Favorite: {
    user: async (parent: IFavorite, _: unknown, ctx: any) => {
      return ctx.loaders.usersByIds.load(parent.userId);
    },
    character: async (parent: IFavorite, _: unknown, ctx: any) => {
      return ctx.loaders.charactersByIds.load(parent.characterId);
    },
  },
};
