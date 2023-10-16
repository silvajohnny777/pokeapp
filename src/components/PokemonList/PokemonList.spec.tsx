import { fireEvent, render } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { PokemonMock } from "../../mocks/pokemonMock";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

let loadingValue = true;
let nextPathVariable = "";
let previousPathVariable = "";
let click = jest.fn();

jest.mock("../../hooks", () => ({
  useGetPokemons: () => ({
    pokemons: PokemonMock,
    loadingPokemons: loadingValue,
    getPokemons: click,
    state: {
      nextPath: nextPathVariable,
      previousPath: previousPathVariable,
    },
  }),
}));

describe("PokemonList component tests", () => {
  it("should render the PokemonList component correctly in the loading state", () => {
    const { getAllByText } = render(<PokemonList />);
    expect(getAllByText("Loading...")).toHaveLength(10);
  });

  it("should display pokemons list when it has data", () => {
    loadingValue = false;
    const { getByText } = render(
      <Router>
        <PokemonList />
      </Router>
    );
    const bulbasaur = getByText("bulbasaur");
    const ivysaur = getByText("ivysaur");
    const charizard = getByText("charizard");
    const blastoise = getByText("blastoise");
    expect(bulbasaur).toBeInTheDocument();
    expect(ivysaur).toBeInTheDocument();
    expect(charizard).toBeInTheDocument();
    expect(blastoise).toBeInTheDocument();
  });

  it("should render only nextButton if nextPath has data but previousPath doesn't", () => {
    loadingValue = false;
    nextPathVariable = "nextPath";
    const { getByText, queryByText } = render(
      <Router>
        <PokemonList />
      </Router>
    );
    expect(getByText("Next Page")).toBeInTheDocument();
    expect(queryByText("Previous Page")).not.toBeInTheDocument();
  });

  it("should render only previousButton if previousPath has data but nextPath doesn't", () => {
    loadingValue = false;
    previousPathVariable = "previousPath";
    nextPathVariable = "";
    const { getByText, queryByText } = render(
      <Router>
        <PokemonList />
      </Router>
    );
    expect(getByText("Previous Page")).toBeInTheDocument();
    expect(queryByText("Next Page")).not.toBeInTheDocument();
  });

  it("should load next data when button is clicked", () => {
    loadingValue = false;
    nextPathVariable = "nextPath";
    click = jest.fn();
    const { getByRole } = render(
      <Router>
        <PokemonList />
      </Router>
    );
    const nextButton = getByRole("button", { name: "Next Page" });
    fireEvent.click(nextButton);
    expect(click).toHaveBeenCalled();
  });

  it("should previous more data when button is clicked", () => {
    loadingValue = false;
    previousPathVariable = "previousPath";
    click = jest.fn();
    const { getByRole } = render(
      <Router>
        <PokemonList />
      </Router>
    );
    const previousButton = getByRole("button", { name: "Previous Page" });
    fireEvent.click(previousButton);
    expect(click).toHaveBeenCalled();
  });
});
