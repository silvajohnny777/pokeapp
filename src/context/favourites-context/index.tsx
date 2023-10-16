import { useState, createContext, ReactNode } from "react";
import { pokemonTypes } from "../../types/global.d";
import { useLocalStorage } from "../../hooks";

type FavouritesContextTypes = {
  favourites: pokemonTypes[];
  setFavourites: (favourites: pokemonTypes[]) => void;
  HandleFavourite: (name: string, image: string) => void;
};

export const FavouritesContext = createContext<FavouritesContextTypes>(
  {} as FavouritesContextTypes
);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<pokemonTypes[]>([]);
  const { useSetLocalStorage, useGetLocalStorage } = useLocalStorage();

  const HandleFavourite = (name: string, image: string) => {
    const favouritesHandler = [...favourites];
    const position = favouritesHandler.findIndex(
      (pokemon: pokemonTypes) => pokemon.name === name
    );

    const favourite: pokemonTypes = {
      name: name,
      pokemonImage: image,
    };

    if (position === -1) {
      favouritesHandler.push(favourite);
    } else {
      favouritesHandler.splice(position, 1);
    }

    setFavourites(favouritesHandler);
    useSetLocalStorage(`favourites`, favouritesHandler);
  };

  const favouritesFromStorage = useGetLocalStorage("favourites");
  favouritesFromStorage?.length > 0 &&
    favourites.length === 0 &&
    setFavourites(favouritesFromStorage);

  return (
    <FavouritesContext.Provider
      value={{ favourites, setFavourites, HandleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
