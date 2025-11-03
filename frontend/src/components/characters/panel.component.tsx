import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { CiSearch } from "react-icons/ci";
import { PiSliders } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@apollo/client/react";
import { FaSortAmountDown } from "react-icons/fa";
import { ICharactersResponse } from "../../types/character.entity";
import { useMainContext } from "../../context/main.context";
import { ROUTES } from "../../constants/routes.constants";
import { ICharacter } from "../../types/character.entity";
import Input from "../common/input.component";
import Filters from "./filters.component";
import {
  GET_CHARACTERS,
  GET_FAVORITE_CHARACTERS,
} from "../../api/graphql/queries/character.queries";
import List from "./list.component";

const Panel = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");
  const {
    setShowFilters,
    showFilters,
    setUserModalVisible,
    appliedFilters,
    getUser,
    setFavoriteCharacters,
    favoriteCharacters,
  } = useMainContext();

  const user = getUser();

  const { data: allData } = useQuery<ICharactersResponse>(GET_CHARACTERS, {
    variables: {
      filter: appliedFilters,
    },
  });
  const { data: favoriteData, refetch } = useQuery<{
    favoritesByUserId: { character: ICharacter }[];
  }>(GET_FAVORITE_CHARACTERS, {
    variables: {
      userId: user?.id,
    },
  });

  const filteredFavoriteCharacters = useMemo(
    () =>
      favoriteData?.favoritesByUserId
        ?.filter(
          (favorite) =>
            favorite.character.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            favorite.character.species
              .toLowerCase()
              .includes(search.toLowerCase())
        )
        .map((favorite) => favorite.character)
        .sort((a, b) =>
          sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        ),
    [favoriteData?.favoritesByUserId, search, sortType]
  );

  const filteredCharacters = useMemo(
    () =>
      allData?.characters
        ?.filter(
          (character) =>
            character.name.toLowerCase().includes(search.toLowerCase()) ||
            character.species.toLowerCase().includes(search.toLowerCase())
        )
        .map((character) => character)
        .sort((a, b) =>
          sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        ),
    [allData?.characters, search, sortType]
  );

  useEffect(() => {
    refetch();
  }, [favoriteCharacters]);

  useEffect(() => {
    if (favoriteData?.favoritesByUserId?.length) {
      setFavoriteCharacters(
        favoriteData?.favoritesByUserId.map((favorite) => favorite.character)
      );
    }
  }, [favoriteData]);

  return (
    <div className="flex flex-col gap-4 pb-6 pr-4 h-screen bg-gray-100">
      <header className="pt-[2.625rem] px-6 flex items-center justify-between">
        <Link to={ROUTES.HOME}>
          <h1 className="pb-2 font-bold text-2xl">Rick and Morty list</h1>
        </Link>
        <button
          onClick={() => setUserModalVisible(true)}
          className="cursor-pointer"
        >
          <FaUserCircle className="text-gray-600 text-3xl" />
        </button>
      </header>
      <div className="mx-6 relative">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<CiSearch className="text-gray-400 text-xl" />}
          suffix={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="cursor-pointer"
              >
                <PiSliders className="text-primary-600 text-xl" />
              </button>
              <button
                onClick={() => setSortType(sortType === "asc" ? "desc" : "asc")}
                className="cursor-pointer"
              >
                <FaSortAmountDown
                  className={twMerge(
                    "text-primary-600 text-xl",
                    sortType === "desc" ? "rotate-180" : ""
                  )}
                />
              </button>
            </div>
          }
        />
        <Filters />
      </div>
      <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 py-4">
        <List
          title={`STARRED CHARACTERS (${
            filteredFavoriteCharacters?.length || 0
          })`}
          characters={filteredFavoriteCharacters}
        />
        <List
          title={`CHARACTERS (${filteredCharacters?.length || 0})`}
          characters={filteredCharacters?.filter(
            (character) =>
              !favoriteCharacters.some(
                (favorite) => favorite.id === character.id
              )
          )}
        />
      </div>
    </div>
  );
};

export default Panel;
