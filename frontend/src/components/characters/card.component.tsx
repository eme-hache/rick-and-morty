import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { RxArrowLeft } from "react-icons/rx";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_FAVORITE } from "../../api/graphql/mutations/user.mutations";
import { getCharacterDetails } from "../../schema/character-details.schema";
import { ICharacter } from "../../types/character.entity";
import { ROUTES } from "../../constants/routes.constants";
import { useMainContext } from "../../context/main.context";

const Card = ({ character }: { character?: ICharacter }) => {
  const { getUser, favoriteCharacters, setFavoriteCharacters } =
    useMainContext();

  const [toggleFavorite] = useMutation<{
    toggleFavorite: {
      favorite: { character: ICharacter };
      isFavorite: boolean;
    };
  }>(TOGGLE_FAVORITE);

  const handleOnToggleFavorite = async () => {
    const { data } = await toggleFavorite({
      variables: { userId: getUser()?.id, characterId: character?.id },
    });

    const isFavorite = data?.toggleFavorite?.isFavorite;

    if (isFavorite) {
      setFavoriteCharacters([
        ...favoriteCharacters,
        data?.toggleFavorite?.favorite?.character,
      ]);
    } else {
      const favoriteIndex = favoriteCharacters.findIndex(
        (favorite) => favorite.id === character?.id
      );
      if (favoriteIndex > -1) {
        favoriteCharacters.splice(favoriteIndex, 1);
        setFavoriteCharacters([...favoriteCharacters]);
      }
    }
  };

  if (!character) return null;

  return (
    <article className="">
      <header className="flex flex-col gap-2 px-6 md:px-[6.25rem] md:pt-10 pb-4 relative">
        <div className="flex items-center py-4 justify-between md:hidden">
          <Link to={ROUTES.HOME}>
            <RxArrowLeft className="text-4xl text-primary-600" />
          </Link>
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2 rounded-full w-[4.6875rem] h-[4.6875rem] relative">
            <img
              className="rounded-full object-cover w-full h-full"
              src={character.image}
              alt={character.name}
            />
            <button
              onClick={handleOnToggleFavorite}
              className="cursor-pointer absolute w-8 h-8 rounded-full bg-gray-50 bottom-0 -right-2 flex items-center justify-center"
            >
              {favoriteCharacters.some(
                (favorite) => favorite.id === character.id
              ) ? (
                <FaHeart className="text-secondary-600 text-xl" />
              ) : (
                <CiHeart className="text-gray-400 text-xl" />
              )}
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">{character.name}</h2>
      </header>

      <div className="px-6 md:px-[6.25rem]">
        <ul>
          {getCharacterDetails(character).map((detail) => (
            <li key={detail.field} className="flex flex-col py-4">
              <span className="font-semibold text-base text-gray-900">
                {detail.label}
              </span>
              <span className="font-medium text-base text-gray-500">
                {detail.field}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Card;
