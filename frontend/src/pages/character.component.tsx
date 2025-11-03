import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { GET_CHARACTER_BY_ID } from "../api/graphql/queries/character.queries";
import { ICharactersByIdResponse } from "../types/character.entity";
import Card from "../components/characters/card.component";

const Character = () => {
  const { id } = useParams();
  const { data } = useQuery<ICharactersByIdResponse>(GET_CHARACTER_BY_ID, {
    variables: { id: Number(id) },
  });

  return <Card character={data?.character} />;
};

export default Character;
