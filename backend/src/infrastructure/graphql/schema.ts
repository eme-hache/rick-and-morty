import { gql } from "graphql-tag";

export const typeDefs = gql`
  # ==================== Character ====================
  type Character {
    id: Int!
    rmId: Int!
    name: String!
    status: String!
    species: String!
    gender: String!
    origin: String!
    image: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    comments: [Comment!]!
    favorites: [Favorite!]!
    favoritesCount: Int!
  }

  input CharacterFilter {
    name: String
    status: String
    species: String
    gender: String
    origin: String
  }

  # ==================== User ====================
  type User {
    id: Int!
    email: String!
    name: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    comments: [Comment!]!
    favorites: [Favorite!]!
    favoritesCount: Int!
  }

  input UserInput {
    id: Int
    email: String!
    name: String!
  }

  # ==================== Comment ====================
  type Comment {
    id: Int!
    userId: Int!
    characterId: Int!
    content: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    user: User!
    character: Character!
  }

  input CommentInput {
    id: Int
    userId: Int!
    characterId: Int!
    content: String!
  }

  # ==================== Favorite ====================
  type Favorite {
    id: Int!
    userId: Int!
    characterId: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    character: Character!
  }

  type ToggleFavoritePayload {
    isFavorite: Boolean!
    favorite: Favorite
  }

  # ==================== Queries ====================
  type Query {
    # Characters
    characters(filter: CharacterFilter): [Character!]!
    character(id: Int!): Character

    # Comments
    commentsByCharacterId(characterId: Int!): [Comment!]!
    commentsByUserId(userId: Int!): [Comment!]!

    # Favorites
    favoritesByCharacterId(characterId: Int!, filter: CharacterFilter): [Favorite!]!
    favoritesByUserId(userId: Int!, filter: CharacterFilter): [Favorite!]!
  }

  # ==================== Mutations ====================
  type Mutation {
    # Users
    upsertUser(user: UserInput!): User!
    deleteUser(id: Int!): Boolean

    # Comments
    upsertComment(comment: CommentInput!): Comment!
    deleteComment(id: Int!): Boolean

    # Favorites
    toggleFavorite(userId: Int!, characterId: Int!): ToggleFavoritePayload!
  }
`;
