import { useCallback, useReducer } from "react";
import { PokemonService } from "../../../../service/http/get-pokemons";
import {
  ActionTypes,
  DetailsResponseTypes,
  DetailsTypes,
} from "../../../../types/global.d";

export const useGetPokemonDetails = <T = unknown,>() => {
  const pokemonDetailsInitialState: DetailsTypes<T> = {
    data: undefined,
    loading: true,
  };

  const Reducer = (
    state: DetailsTypes<T>,
    action: ActionTypes<DetailsResponseTypes>
  ) => {
    switch (action.type) {
      case "loading":
        return { ...pokemonDetailsInitialState, loading: true };
      case "fetched":
        return {
          ...pokemonDetailsInitialState,
          data: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

  const [details, dispatch] = useReducer(Reducer, pokemonDetailsInitialState);

  const getPokemonDetails = useCallback(async (pokemonName: string) => {
    dispatch({ type: "loading" });
    const response = (await PokemonService.getPokemonsDetails(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    )) as DetailsResponseTypes;
    dispatch({ type: "fetched", payload: response });
  }, []);

  return {
    pokemonDetails: details.data,
    loadingDetails: details.loading,
    getPokemonDetails,
  };
};
