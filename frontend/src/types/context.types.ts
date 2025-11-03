import { IUser } from "./user.types";
import { ICharacter } from "./character.types";

export interface IMainContext {
  appliedFilters: any;
  deleteUser: () => void;
  favoriteCharacters: ICharacter[];
  getUser: () => Partial<IUser> | null;
  saveUser: (user: Partial<IUser>) => void;
  setAppliedFilters: (filters: any) => void;
  setFavoriteCharacters: (characters: ICharacter[]) => void;
  setShowFilters: (show: boolean) => void;
  setUserModalVisible: (show: boolean) => void;
  showFilters: boolean;
  userModalVisible: boolean;
}
