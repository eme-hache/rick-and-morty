import { CharacterRepositoryImpl } from "../repositories/character.repository.impl";
import { FavoriteRepositoryImpl } from "../repositories/favorite.repository.impl";
import { CommentRepositoryImpl } from "../repositories/comment.repository.impl";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import {
  GetCharacterUseCase,
  GetCharactersUseCase,
  GetCharactersByIdsUseCase,
} from "../../application/use-cases/characters";
import {
  DeleteCommentUseCase,
  GetCommentsByCharacterIdUseCase,
  GetCommentsByUserIdUseCase,
  UpsertCommentUseCase,
  GetCommentsByIdsUseCase,
  GetCommentsByCharacterIdsUseCase,
  GetCommentsByUserIdsUseCase,
} from "../../application/use-cases/comments";
import {
  GetFavoritesByCharacterIdUseCase,
  GetFavoritesByUserIdUseCase,
  ToggleFavoriteUseCase,
  GetFavoritesByIdsUseCase,
  GetFavoritesByCharacterIdsUseCase,
  GetFavoritesByUserIdsUseCase,
} from "../../application/use-cases/favorites";
import {
  DeleteUserUseCase,
  UpsertUserUseCase,
  GetUserByIdUseCase,
  GetUsersByIdsUseCase,
} from "../../application/use-cases/users";

const characterRepo = new CharacterRepositoryImpl();
const favoriteRepo = new FavoriteRepositoryImpl();
const commentRepo = new CommentRepositoryImpl();
const userRepo = new UserRepositoryImpl();

export const container = {
  //repositories
  characterRepo,
  favoriteRepo,
  commentRepo,
  userRepo,

  //characters
  getCharactersUseCase: new GetCharactersUseCase(characterRepo),
  getCharacterUseCase: new GetCharacterUseCase(characterRepo),
  getCharactersByIdsUseCase: new GetCharactersByIdsUseCase(characterRepo),

  //comments
  deleteCommentUseCase: new DeleteCommentUseCase(commentRepo),
  getCommentByCharacterIdUseCase: new GetCommentsByCharacterIdUseCase(
    commentRepo
  ),
  getCommentByUserIdUseCase: new GetCommentsByUserIdUseCase(commentRepo),
  upsertCommentUseCase: new UpsertCommentUseCase(commentRepo),
  getCommentsByIdsUseCase: new GetCommentsByIdsUseCase(commentRepo),
  getCommentsByCharacterIdsUseCase: new GetCommentsByCharacterIdsUseCase(
    commentRepo
  ),
  getCommentsByUserIdsUseCase: new GetCommentsByUserIdsUseCase(commentRepo),

  //favorites
  getFavoritesByCharacterIdUseCase: new GetFavoritesByCharacterIdUseCase(
    favoriteRepo
  ),
  getFavoritesByUserIdUseCase: new GetFavoritesByUserIdUseCase(favoriteRepo),
  toggleFavoriteUseCase: new ToggleFavoriteUseCase(favoriteRepo),
  getFavoritesByIdsUseCase: new GetFavoritesByIdsUseCase(favoriteRepo),
  getFavoritesByCharacterIdsUseCase: new GetFavoritesByCharacterIdsUseCase(
    favoriteRepo
  ),
  getFavoritesByUserIdsUseCase: new GetFavoritesByUserIdsUseCase(favoriteRepo),

  //users
  deleteUserUseCase: new DeleteUserUseCase(userRepo),
  upsertUserUseCase: new UpsertUserUseCase(userRepo),
  getUserByIdUseCase: new GetUserByIdUseCase(userRepo),
  getUsersByIdsUseCase: new GetUsersByIdsUseCase(userRepo),
};
