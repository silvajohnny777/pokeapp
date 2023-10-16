import { useReducer, useCallback } from "react";
import {
  actionsTypes,
  fetchedDataTypes,
  initialStateTypes,
  //stateTypes,
} from "../../types/global.d";
import { PokemonService } from "../../service/http/get-pokemons";

export const useGetPokemons = <T = unknown,>() => {
  const initialState: initialStateTypes<T> = {
    pokemons: [],
    fetchedData: undefined,
    isLoading: true,
    previousPath: "",
    path: `https://pokeapi.co/api/v2/pokemon?limit=10`,
    nextPath: "",
    error: undefined,
  };

  const Reducer = (
    state: initialStateTypes<T>,
    action: actionsTypes<fetchedDataTypes>
  ) => {
    switch (action.type) {
      case "loading":
        return { ...initialState, isLoading: true };
      case "fetched":
        return {
          ...initialState,
          pokemons: action.payload.results || [],
          fetchedData: action.payload,
          nextPath: action.payload.next,
          previousPath: action.payload.previous,
          isLoading: false,
        };
      case "error":
        return { ...initialState, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(
    Reducer as React.Reducer<
      initialStateTypes<T>,
      actionsTypes<fetchedDataTypes>
    >,
    initialState
  );

  const getPokemons = useCallback(
    async (buttonPath?: string) => {
      dispatch({ type: "loading" });
      const response = (await PokemonService.getPokemons({
        path: buttonPath ? buttonPath : initialState.path,
      })) as fetchedDataTypes;
      dispatch({ type: "fetched", payload: response });
    },
    [initialState.path]
  );

  return {
    pokemons: state.pokemons,
    loadingPokemons: state.isLoading,
    getPokemons,
    state,
  };
};
