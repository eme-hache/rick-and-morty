import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($filter: CharacterFilter) {
    characters(filter: $filter) {
      id
      name
      gender
      status
      species
      image
      origin
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query CharacterById($id: Int!) {
    character(id: $id) {
      id
      name
      gender
      status
      species
      image
      origin
    }
  }
`;

export const GET_FAVORITE_CHARACTERS = gql`
  query GetFavoriteCharacters($userId: Int!) {
    favoritesByUserId(userId: $userId) {
      character {
        id
        name
        gender
        status
        species
        image
        origin
      }
    }
  }
`;
