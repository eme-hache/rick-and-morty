import { createContext, useContext, useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  CREATE_USER,
  DELETE_USER,
} from "../api/graphql/mutations/user.mutations";
import { IMainContext } from "../types/context.types";
import { ICharacter } from "../types/character.types";
import { IUser } from "../types/user.types";

export const MainContext = createContext<IMainContext | null>(null);

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<ICharacter[]>([]);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const [createUser] = useMutation<{ upsertUser: IUser }>(CREATE_USER);
  const [removeUser] = useMutation(DELETE_USER);

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const saveUser = async (user: Partial<IUser>) => {
    const { data } = await createUser({ variables: { user } });
    localStorage.setItem("user", JSON.stringify({ ...data?.upsertUser }));
  };

  const deleteUser = async () => {
    await removeUser({ variables: { id: getUser()?.id } });
    localStorage.removeItem("user");
  };

  return (
    <MainContext.Provider
      value={{
        appliedFilters,
        deleteUser,
        favoriteCharacters,
        getUser,
        saveUser,
        setAppliedFilters,
        setFavoriteCharacters,
        setShowFilters,
        setUserModalVisible,
        showFilters,
        userModalVisible,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }

  return context;
};
