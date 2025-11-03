import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ICharacter } from "../../types/character.entity";
import { ROUTES } from "../../constants/routes.constants";
import { useMainContext } from "../../context/main.context";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_FAVORITE } from "../../api/graphql/mutations/user.mutations";

const List = ({
  title,
  characters,
}: {
  title: string;
  characters?: ICharacter[];
}) => {
  const { favoriteCharacters, getUser, setFavoriteCharacters } =
    useMainContext();

  const [toggleFavorite] = useMutation<{
    toggleFavorite: {
      favorite: { character: ICharacter };
      isFavorite: boolean;
    };
  }>(TOGGLE_FAVORITE);

  const handleOnToggleFavorite = async (character: ICharacter) => {
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

  return (
    <div className="flex flex-col">
      <header className="mx-6">
        <h3 className="px-5 py-4 font-semibold text-xs text-gray-500 min-h-[3.5rem] flex items-center border-b border-gray-200">
          {title}
        </h3>
      </header>
      <ul>
        {characters?.map((character) => (
          <li
            key={character.id}
            className="mx-6 border-b not-hover:border-gray-200 hover:border-transparent last:border-b-0 transition-all duration-200"
          >
            <Link
              to={ROUTES.CHARACTER.replace(":id", character.id.toString())}
              className="py-4 px-5 flex gap-4 items-center cursor-pointer rounded-lg hover:bg-primary-100"
            >
              <div className="rounded-full overflow-hidden w-8 h-8">
                <img
                  className="w-full h-full object-cover"
                  src={character.image}
                  alt={character.name}
                />
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-base text-gray-900">
                  {character.name}
                </h4>
                <p className="font-normal text-base text-gray-500">
                  {character.species}
                </p>
              </div>
              <button
                onClick={() => handleOnToggleFavorite(character)}
                className={twMerge(
                  "ml-auto cursor-pointer w-8 h-8 rounded-full flex items-center justify-center",
                  favoriteCharacters.some(
                    (favorite) => favorite.id === character.id
                  )
                    ? "bg-gray-50"
                    : "bg-transparent"
                )}
              >
                {favoriteCharacters.some(
                  (favorite) => favorite.id === character.id
                ) ? (
                  <FaHeart className="text-secondary-600 text-xl" />
                ) : (
                  <CiHeart className="text-gray-400 text-xl" />
                )}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
