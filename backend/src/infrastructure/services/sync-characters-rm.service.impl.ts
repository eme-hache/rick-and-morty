import { ISyncCharactersService } from "../../domain/services/sync-characters.service";
import { ICharacter } from "../../domain/entities/character.entity";

export class SyncCharactersRMServiceImpl implements ISyncCharactersService {
  private readonly baseUrl = "https://rickandmortyapi.com/api";

  async syncCharacters(): Promise<ICharacter[]> {
    const characters: ICharacter[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`${this.baseUrl}/character?page=${page}`);
      const data = await response.json();

      characters.push(...data.results.map(this.mapToEntity));

      hasMore = data.info.next !== null;
      page++;
    }

    return characters;
  }

  private mapToEntity(apiChar: any): ICharacter {
    return {
      id: apiChar.id,
      rmId: apiChar.id,
      name: apiChar.name,
      status: apiChar.status,
      species: apiChar.species,
      gender: apiChar.gender || "",
      image: apiChar.image || "",
      origin: apiChar.origin?.name || "",
      favoritesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  }
}
