import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetPokemonDetails } from "./hooks";
import { IsFavourite } from "./function";
import {
  AbilityTypes,
  DetailsResponseTypes,
  MovesTypes,
  TypesType,
} from "../../types/global.d";
import { FavouritesContext } from "../../context/favourites-context";

export const Pokemon = () => {
  const { pokemonName } = useParams();

  const { getPokemonDetails, loadingDetails, pokemonDetails } =
    useGetPokemonDetails<DetailsResponseTypes>();

  const { HandleFavourite } = useContext(FavouritesContext);

  useEffect(() => {
    document.title = pokemonName!;
    getPokemonDetails(pokemonName!);
  }, [getPokemonDetails, pokemonName]);

  const isFavourite = IsFavourite(
    pokemonDetails?.name ? pokemonDetails!.name : ""
  );

  return (
    <div className="flex justify-center mb-[20px] md:mb-0">
      <div className="flex flex-col justify-center w-[90%] min-[1000px]:w-[1000px] mt-[20px]">
        {loadingDetails ? (
          `loading pokemon info...`
        ) : (
          <div className="flex flex-col md:flex-row">
            <img
              className="w-full md:w-[300px] h-[300px] md:mr-[20px] min-[1000px]:sticky min-[1000px]:top-[20px]"
              src={pokemonDetails?.sprites.other.dream_world.front_default}
            />
            <div>
              <h1 className="text-center md:text-left title text-[21px] font-bold uppercase">
                {pokemonDetails?.name}
              </h1>
              <button
                className={`border-[red] border-[1px] ${
                  isFavourite
                    ? "bg-[red] text-[white]"
                    : "bg-[white] text-[red]"
                } hover:bg-[red] hover:text-white text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center mt-4`}
                onClick={() =>
                  HandleFavourite(
                    pokemonDetails!.name,
                    pokemonDetails!.sprites.other.dream_world.front_default
                  )
                }
              >
                <span>
                  {isFavourite ? `Remove from favourites` : `Add as favourite`}
                </span>
              </button>
              <div className="flex flex-wrap">
                <div>
                  <h3 className="text-[18px] font-bold mt-4">Abilities:</h3>
                  <ul>
                    {pokemonDetails?.abilities.map((ability: AbilityTypes) => {
                      return (
                        <li key={ability.ability.name} className="ml-2">
                          • {ability.ability.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ml-4">
                  <h3 className="text-[18px] font-bold mt-4">types:</h3>
                  <ul>
                    {pokemonDetails?.types.map((type: TypesType) => {
                      return (
                        <li key={type.type.name} className="ml-2">
                          • {type.type.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <h3 className="text-[18px] font-bold mt-4">Moves:</h3>
              <ul>
                {pokemonDetails?.moves.map((move: MovesTypes) => {
                  return (
                    <li key={move.move.name} className="ml-2 hover:font-bold">
                      • {move.move.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
