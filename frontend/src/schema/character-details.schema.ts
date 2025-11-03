import { ICharacter } from "../types/character.entity";

export const getCharacterDetails = (
  character: ICharacter
): { label: string; field: string }[] => [
  {
    label: "Specie",
    field: character.species,
  },
  {
    label: "Status",
    field: character.status,
  },
  {
    label: "Origin",
    field: character.origin,
  },
];
