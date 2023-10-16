import { PokemonMock } from "../../../../mocks/pokemonMock";
import { IsFavourite } from "./";

describe("isFavourite function test", () => {
  it("IsFavourite function should return false if there is no information on storage", () => {
    expect(IsFavourite("Pikachu")).toBeFalsy();
  });

  it("IsFavourite function should return true when the pokemon is in storage", () => {
    const name = PokemonMock[0].name;
    window.localStorage.setItem(`favourites`, JSON.stringify(PokemonMock));
    expect(IsFavourite(`${name}`)).toBeTruthy();
  });
});
