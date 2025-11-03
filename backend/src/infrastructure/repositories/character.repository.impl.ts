import { ICharacterRepository } from "../../domain/repositories/character.repository";
import { Character } from "../db/models/character";
import {
  ICharacter,
  ICharacterFilter,
} from "../../domain/entities/character.entity";

export class CharacterRepositoryImpl implements ICharacterRepository {
  async upsertMany(characters: ICharacter[]): Promise<ICharacter[]> {
    return await Character.bulkCreate(characters, {
      updateOnDuplicate: ["name", "status", "species", "gender", "origin"],
    });
  }

  async findAll(filters?: ICharacterFilter): Promise<ICharacter[]> {
    const where: Partial<ICharacter> = {};

    if (filters?.name) where.name = filters.name;
    if (filters?.status) where.status = filters.status;
    if (filters?.species) where.species = filters.species;
    if (filters?.gender) where.gender = filters.gender;
    if (filters?.origin) where.origin = filters.origin;

    const characters = await Character.findAll({ where: { ...where, deletedAt: null } });
    return characters.map((c) => c.get());
  }

  async findById(id: ICharacter["id"]): Promise<ICharacter | null> {
    const character = await Character.findByPk(id);

    return character?.get() ?? null;
  }

  async delete(id: ICharacter["id"]): Promise<void> {
    await Character.destroy({ where: { id } });
  }

  async findAllById(ids: ICharacter["id"][]): Promise<ICharacter[] | null> {
    return Character.findAll({ where: { id: ids } });
  }
}
