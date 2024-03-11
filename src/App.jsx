import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/template/Trending";
import Popular from "./Components/template/Popular";
import Movies from "./Components/template/Movies";
import TvShows from "./Components/template/TvShows";
import People from "./Components/template/People";
import MovieDetails from "./Components/template/MovieDetails";
import PersonDetails from "./Components/template/PersonDetails";
import TvDetails from "./Components/template/TvDetails";
import Trailer from "./Components/template/Trailer";

function App() {
  return (
    <div className="w-screen h-screen flex bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>

        <Route path="/movie" element={<Movies />}></Route>
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/person" element={<People />}></Route>
        <Route path="/person/details/:id" element={<PersonDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
