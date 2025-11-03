import { ICharacter, ICharacterFilter } from "../entities/character.entity";

export abstract class ICharacterRepository {
  abstract upsertMany(characters: Partial<ICharacter>[]): Promise<ICharacter[]>;
  abstract findAll(filters?: ICharacterFilter): Promise<ICharacter[]>;
  abstract findById(id: ICharacter["id"]): Promise<ICharacter | null>;
  abstract delete(id: ICharacter["id"]): Promise<void>;
  abstract findAllById(ids: ICharacter["id"][]): Promise<ICharacter[] | null>;
}
