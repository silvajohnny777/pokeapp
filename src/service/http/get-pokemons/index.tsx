/*
    This file is a service created to handle the API call.
*/

import axios from "axios";
import { getPokemonsTypes, pokemonTypes } from "../../../types/global.d";

export const PokemonService = {
  getPokemons: async ({
    path,
  }: getPokemonsTypes): Promise<unknown | undefined> => {
    try {
      const response = await axios.get(path);
      const pokemonList = response.data.results;

      for (const pokemon of pokemonList) {
        const pokemonDataResponse = await axios.get(pokemon.url);
        const pokemonData = pokemonDataResponse.data;

        const name = pokemonData.name;
        const image = pokemonData.sprites.other.dream_world.front_default;

        // Adding the pokemon image to the primary data.
        const pokemonPosition = response.data.results.findIndex(
          (pokemon: pokemonTypes) => pokemon.name === name
        );
        response.data.results[pokemonPosition].pokemonImage = image;
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  getPokemonsDetails: async (path: string): Promise<unknown | undefined> => {
    try {
      const response = await axios.get(path);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },
};
