import { render } from "@testing-library/react";
import { Pokemon } from "./Pokemon";
import { FavouritesContext } from "../../context/favourites-context";
import { PokemonMock } from "../../mocks/pokemonMock";
import useGetPokemonDetailsMock from "../../mocks/useGetPokemonDetails";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ pokemonName: "charizard" }),
}));

let loadingValue = true;

jest.mock("./hooks", () => ({
  useGetPokemonDetails: () => ({
    pokemonDetails: useGetPokemonDetailsMock().pokemonDetails,
    loadingDetails: loadingValue,
    getPokemonDetails: jest.fn(),
  }),
}));

describe("Pokemon component tests", () => {
  const favoritePokemons = {
    favourites: PokemonMock,
    setFavourites: jest.fn(),
    HandleFavourite: jest.fn(),
  };

  it("should display loading message when loadingDetails is true", () => {
    const { getByText } = render(
      <FavouritesContext.Provider
        value={{ ...favoritePokemons, favourites: [] }}
      >
        <Pokemon />
      </FavouritesContext.Provider>
    );

    expect(getByText("loading pokemon info...")).toBeInTheDocument();
  });

  it("should display pokemon data", async () => {
    loadingValue = false;
    const { getByText } = render(
      <FavouritesContext.Provider value={favoritePokemons}>
        <Pokemon />
      </FavouritesContext.Provider>
    );

    expect(getByText("Pikachu")).toBeInTheDocument();
    expect(getByText("Abilities:")).toBeInTheDocument();
    expect(getByText("types:")).toBeInTheDocument();
    expect(getByText("Moves:")).toBeInTheDocument();
  });
});
