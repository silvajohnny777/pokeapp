import { useContext } from "react";
import { FavouritesContext } from "../../context/favourites-context";
import { pokemonTypes } from "../../types/global.d";
import { PokemonCard } from "../PokemonCard";

export const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  document.title = "Favourites";

  return (
    <div className="flex justify-center mb-[20px] md:mb-0">
      <div className="flex flex-col justify-center w-[90%] min-[1000px]:w-[1000px]">
        <h1 className="text-[25px] font-bold mb-4">Favourites</h1>
        <div className="flex flex-wrap mb-[20px]">
          {favourites.length > 0 ? (
            favourites.map((favouritePokemon: pokemonTypes) => {
              return (
                <PokemonCard
                  key={favouritePokemon.name}
                  {...favouritePokemon}
                />
              );
            })
          ) : (
            <h2 className="text-[18px] font-bold">
              There're no pokemons in your favourite list.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
