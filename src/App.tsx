import { Favourites } from "./components/Favourites";
import { Header } from "./components/Header";
import { Pokemon } from "./components/Pokemon";
import { PokemonList } from "./components/PokemonList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { FavouritesProvider } from "./context/favourites-context";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <FavouritesProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:pokemonName" element={<Pokemon />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Router>
      </FavouritesProvider>
    </ErrorBoundary>
  );
}

export default App;
