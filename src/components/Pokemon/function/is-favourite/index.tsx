import { useLocalStorage } from "../../../../hooks";
import { pokemonTypes } from "../../../../types/global.d";

export const IsFavourite = (name: string | undefined) => {
  const { useGetLocalStorage } = useLocalStorage();
  const favourites = useGetLocalStorage(`favourites`);
  return favourites?.length
    ? favourites.findIndex((pokemon: pokemonTypes) => pokemon.name === name) !==
        -1
    : false;
};
