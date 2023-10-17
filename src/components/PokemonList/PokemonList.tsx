import { useEffect } from "react";
import { useGetPokemons } from "../../hooks";
import { pokemonTypes } from "../../types/global.d";
import { PokemonCard, PokemonCardLoading } from "../PokemonCard";
import { Button } from "../GlobalComponents/Button";

export const PokemonList = () => {
  const { getPokemons, pokemons, loadingPokemons, state } = useGetPokemons();

  useEffect(() => {
    document.title = `Pokemons`;
    getPokemons();
  }, [getPokemons]);

  return (
    <div className="flex justify-center mb-[20px] md:mb-0">
      <div className="flex flex-col justify-center w-[90%] min-[1000px]:w-[1000px]">
        <div className="flex flex-wrap min-[1000px]:justify-between mb-[20px]">
          {loadingPokemons ? (
            <PokemonCardLoading />
          ) : (
            Array.isArray(pokemons) &&
            pokemons?.map((pokemon: pokemonTypes) => {
              return <PokemonCard key={pokemon.name} {...pokemon} />;
            })
          )}
        </div>
        <div className="max-[1000px]:flex max-[1000px]:justify-between">
          {state.previousPath && (
            <Button
              title={`Previous Page`}
              disabled={loadingPokemons}
              click={() => {
                getPokemons(state.previousPath);
              }}
              aria-label="Button to previous page"
            />
          )}

          {state.nextPath && (
            <Button
              title={`Next Page`}
              disabled={loadingPokemons}
              click={() => {
                getPokemons(state.nextPath);
              }}
              aria-label="Button to next page"
            />
          )}
        </div>
      </div>
    </div>
  );
};
