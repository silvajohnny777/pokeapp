export type getPokemonsTypes = {
  path: string;
};

export type pokemonResponseTypes = {
  count: number;
  next: string;
  previous: string | null;
  results: pokemonTypes[];
};

export type pokemonTypes = {
  name: string;
  url?: string;
  pokemonImage?: string;
};

export type fetchedDataTypes = {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemonTypes[];
};

export type AbilityTypes = {
  ability: {
    name: string;
  };
};

export type MovesTypes = {
  move: {
    name: string;
  };
};

export type TypesType = {
  slot: number;
  type: {
    name: string;
  };
};

export type initialStateTypes<T> = {
  pokemons: pokemonTypes[] | T;
  fetchedData: fetchedDataTypes | undefined;
  isLoading: boolean;
  previousPath: string;
  path: string;
  nextPath: string;
  error: Error | undefined;
};

export type stateTypes<T> = {
  data?: pokemonTypes | T;
  error?: Error;
  isLoading: boolean;
};

export type actionsTypes<T> =
  | {
      type: "loading";
    }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export type DetailsResponseTypes = {
  name: string;
  base_experience: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  types: TypesType[];
  abilities: AbilityTypes[];
  moves: MovesTypes[];
};

export type DetailsTypes<T> = {
  data: T | DetailsResponseTypes | undefined;
  loading: boolean;
};

export type ActionTypes<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T };

export type PokemonDetailsTypes = {
  getPokemonDetails: () => null;
  loadingDetails: boolean;
  pokemonDetails: DetailsResponseTypes;
};
