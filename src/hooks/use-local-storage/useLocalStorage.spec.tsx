import { PokemonMock } from "../../mocks/pokemonMock";
import { useLocalStorage } from "./";

describe("testing useLocalStorage hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return item from localStorage", () => {
    //window.localStorage.setItem("key", JSON.stringify(PokemonMock));
    const { useGetLocalStorage, useSetLocalStorage } = useLocalStorage();
    useSetLocalStorage(`favourites`, PokemonMock);
    expect(useGetLocalStorage(`favourites`)).toStrictEqual(PokemonMock);
  });

  it("should set the item to localStorage", () => {
    const { useSetLocalStorage, useGetLocalStorage } = useLocalStorage();
    useSetLocalStorage(`favourites`, PokemonMock);

    expect(useGetLocalStorage(`favourites`)).toStrictEqual(PokemonMock);
  });
});
