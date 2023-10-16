import { fireEvent, render, act } from "@testing-library/react";
import { PokemonCard } from "./PokemonCard";
import { BrowserRouter as Router } from "react-router-dom";
import { PokemonMock } from "../../mocks/pokemonMock";
import "@testing-library/jest-dom";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("PokemonCard", () => {
  it("should render the component with the correct data", () => {
    const name = PokemonMock[0].name;
    const pokemonImage = PokemonMock[0].pokemonImage;
    const { getByText, getByAltText } = render(
      <Router>
        <PokemonCard name={name} pokemonImage={pokemonImage} />
      </Router>
    );

    const nameElement = getByText(name);
    const imageElement = getByAltText(`${name}_image`);

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", pokemonImage);
  });

  it("should navigate to the Pokemon details page when the card is clicked", () => {
    const name = PokemonMock[2].name;
    const pokemonImage = PokemonMock[2].pokemonImage;
    const { container } = render(
      <Router>
        <PokemonCard name={name} pokemonImage={pokemonImage} />
      </Router>
    );

    const card = container.firstChild;

    act(() => {
      if (card) {
        fireEvent.click(card);
        expect(mockedNavigate).toHaveBeenCalledWith(`/pokemon/${name}`);
      }
    });
  });
});
