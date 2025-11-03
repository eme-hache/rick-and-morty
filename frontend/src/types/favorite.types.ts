import { ICharacter } from "./character.entity";
import { IUser } from "./user.entity";

export interface IFavorite {
  id: number;
  userId: IUser["id"];
  characterId: ICharacter["id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFavoriteCreationAttributes extends Omit<IFavorite, "id"> {}

export interface IFavoriteTogglePayload {
  favorite: IFavorite | null;
  isFavorite: boolean;
}
