export interface ICharacter {
  id: number;
  rmId: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: string;
  favoritesCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICharacterCreationAttributes extends Omit<ICharacter, "id"> {}

export interface ICharacterFilter {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
}
