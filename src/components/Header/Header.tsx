import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../context/favourites-context";

export const Header = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="h-[70px] bg-[#2a75bb] flex items-center justify-center mb-[20px] shadow-[inset_0px_0px_0px_#DD052B,0px_8px_16px_#33333329]">
      <div className="w-[90%] min-[1000px]:w-[1000px] flex justify-between items-center">
        <Link
          to={`/`}
          className="text-3xl font-bold text-white"
          aria-label="Link to the main page"
        >
          Pokemons
        </Link>
        <Link
          to={`/favourites`}
          className="text-white cursor-pointer text-[18px] hover:underline"
          aria-label="Link to the favourites page"
        >
          {favourites?.length > 0
            ? `${favourites.length} Favourites pokemons`
            : `Favourites pokemons`}
        </Link>
      </div>
    </div>
  );
};
