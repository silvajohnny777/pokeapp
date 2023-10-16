import { act, renderHook } from "@testing-library/react";
import { useGetPokemons } from ".";
//import axios from "axios";
import { getPokemonsMock } from "../../mocks/getPokemonsMock";

jest.mock("axios");

describe("useGetPokemons hook tests", () => {
  const mockGetPokemons = jest.fn();

  beforeEach(() => {
    mockGetPokemons.mockReset();
  });

  it("should return default values", () => {
    const { result } = renderHook(useGetPokemons);

    expect(result.current.pokemons).toHaveLength(0);
    expect(result.current.loadingPokemons).toBeTruthy();
    expect(typeof result.current.getPokemons).toBe("function");
  });

  it("should return pokemons", async () => {
    const mockUseGetPokemons = () => ({
      pokemons: getPokemonsMock.results,
      loadingPokemons: false,
      getPokemons: jest.fn(),
      state: {
        nextPath: getPokemonsMock.next,
        previousPath: getPokemonsMock.previous,
      },
    });
    const { result } = renderHook(() => mockUseGetPokemons());

    await act(async () => {
      await result.current.getPokemons();
    });

    expect(result.current.loadingPokemons).toBeFalsy();
    expect(result.current.pokemons).toEqual(getPokemonsMock.results);
  });
});
