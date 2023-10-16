import { render } from "@testing-library/react";
import { PokemonCardLoading } from ".";
import "@testing-library/jest-dom";

describe("PokemonCardLoading component tests", () => {
  it("should render component correctly", () => {
    const NUMBER_OF_LOADING_CARDS = 10;
    const { getAllByText } = render(<PokemonCardLoading />);
    expect(getAllByText("Loading...")).toHaveLength(NUMBER_OF_LOADING_CARDS);
  });
});
