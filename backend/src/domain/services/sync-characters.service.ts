import { ICharacter } from "../entities/character.entity";

export interface ISyncCharactersService {
  syncCharacters(): Promise<ICharacter[]>;
}
