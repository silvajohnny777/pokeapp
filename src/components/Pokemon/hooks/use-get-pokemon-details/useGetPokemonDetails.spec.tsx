import axios from "axios";
import { useGetPokemonDetails } from ".";
import { act, renderHook } from "@testing-library/react";
import { pokemonDetailsMock } from "../../../../mocks/pokemonDetails";

jest.mock("axios");

describe("useGetPokemonDetails hook tests", () => {
  const mockGetPokemonsDetails = jest.fn();

  beforeEach(() => {
    mockGetPokemonsDetails.mockReset();
  });

  it("should return default values", () => {
    const { result } = renderHook(useGetPokemonDetails);

    expect(result.current.loadingDetails).toBeTruthy();
    expect(typeof result.current.getPokemonDetails).toBe("function");
    expect(result.current.pokemonDetails).toBe(undefined);
  });

  it("should return pokemon details", async () => {
    const axiosGetSpy = jest.spyOn(axios, "get");
    axiosGetSpy.mockResolvedValue({ data: pokemonDetailsMock });

    const { result } = renderHook(useGetPokemonDetails);

    await act(async () => {
      await result.current.getPokemonDetails("pikachu");
    });

    expect(result.current.loadingDetails).toBeFalsy();
    expect(typeof result.current.getPokemonDetails).toBe("function");
    expect(result.current.pokemonDetails).toEqual(pokemonDetailsMock);

    axiosGetSpy.mockRestore();
  });
});
