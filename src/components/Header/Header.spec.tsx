import { fireEvent, render } from "@testing-library/react";
import { Header } from ".";
import { FavouritesContext } from "../../context/favourites-context";
import { BrowserRouter as Router } from "react-router-dom";
import { PokemonMock } from "../../mocks/pokemonMock";
import "@testing-library/jest-dom";

describe("Header component tests", () => {
  const mockFavouritesContext = {
    favourites: [],
    setFavourites: jest.fn(),
    HandleFavourite: jest.fn(),
  };

  it("should render Header component correctly", () => {
    const { getByText } = render(
      <FavouritesContext.Provider value={mockFavouritesContext}>
        <Router>
          <Header />
        </Router>
      </FavouritesContext.Provider>
    );
    expect(getByText("Pokemons")).toBeInTheDocument();
  });

  it("should render the correct number of favorited pokemons", () => {
    const { getByText } = render(
      <FavouritesContext.Provider
        value={{ ...mockFavouritesContext, favourites: PokemonMock }}
      >
        <Router>
          <Header />
        </Router>
      </FavouritesContext.Provider>
    );
    expect(getByText("4 Favourites pokemons").closest("a")).toHaveAttribute(
      "href",
      "/favourites"
    );
  });

  it("should navigate to the Pokemon details page when the card is clicked", () => {
    const { getByText } = render(
      <FavouritesContext.Provider value={mockFavouritesContext}>
        <Router>
          <Header />
        </Router>
      </FavouritesContext.Provider>
    );

    const link = getByText(/Favourites pokemons/i);
    fireEvent.click(link);

    expect(window.location.pathname).toBe("/favourites");
  });
});
