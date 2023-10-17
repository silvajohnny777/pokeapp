import { useNavigate } from "react-router-dom";
import { pokemonTypes } from "../../types/global.d";

export const PokemonCard = ({ name = "", pokemonImage = "" }: pokemonTypes) => {
  const navigate = useNavigate();

  const selectPokemon = (event: React.SyntheticEvent, name: string) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Enter")
    ) {
      navigate(`/pokemon/${name}`);
    }
  };
  return (
    <div
      className="group w-[100%] md:w-[180px] h-[200px] 
      shadow-[inset_0px_0px_0px_#DD052B,0px_8px_16px_#33333329] flex flex-col items-center 
      justify-center m-1 rounded-[6px] cursor-pointer md:hover:bg-[#2a75bb] 
      md:hover:text-white md:focus:bg-[#2a75bb] md:focus:text-white ease-in duration-200"
      tabIndex={0}
      onClick={(event: React.SyntheticEvent) => selectPokemon(event, name)}
      onKeyDown={(event: React.SyntheticEvent) => selectPokemon(event, name)}
      aria-label={`Pokemon card for ${name}`}
    >
      <div>
        <img
          className="ease-in duration-200 w-[100px] h-[100px] group-hover:w-[120px] group-focus:w-[120px] group-hover:h-[120px] group-focus:h-[120px]"
          src={pokemonImage}
          alt={`${name}_image`}
        />
      </div>
      <p className="text-[21px] font-bold truncate w-[100%] text-center">
        {name}
      </p>
    </div>
  );
};
