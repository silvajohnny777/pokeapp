import { render, screen } from "@testing-library/react";
import { Favourites } from ".";
import { FavouritesContext } from "../../context/favourites-context";
import { BrowserRouter as Router } from "react-router-dom";
import { PokemonMock } from "../../mocks/pokemonMock";
import "@testing-library/jest-dom";

describe("Favourites component tests", () => {
  it("should render Favourites component correctly with pokemon list", () => {
    const favoritePokemons = {
      favourites: PokemonMock,
      setFavourites: () => null,
      HandleFavourite: () => null,
    };

    render(
      <FavouritesContext.Provider value={favoritePokemons}>
        <Router>
          <Favourites />
        </Router>
      </FavouritesContext.Provider>
    );

    expect(screen.getByText("Favourites")).toBeInTheDocument();

    favoritePokemons.favourites.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  it("should render Favourites component without favorites pokemons and display message", () => {
    render(
      <FavouritesContext.Provider
        value={{
          favourites: [],
          setFavourites: () => null,
          HandleFavourite: () => null,
        }}
      >
        <Favourites />
      </FavouritesContext.Provider>
    );

    expect(screen.getByText("Favourites")).toBeInTheDocument();

    expect(
      screen.getByText("There're no pokemons in your favourite list.")
    ).toBeInTheDocument();
  });
});
