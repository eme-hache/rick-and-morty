import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    upsertUser(user: $user) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($userId: Int!, $characterId: Int!) {
    toggleFavorite(userId: $userId, characterId: $characterId) {
      isFavorite
      favorite {
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
  }
`;
