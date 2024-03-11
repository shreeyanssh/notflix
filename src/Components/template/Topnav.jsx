import React, { useEffect, useState } from "react";
import axios from "../../Utils/Axios";
import { Link } from "react-router-dom";
import noImage from "/netflix.svg"

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="h-[10vh] z-[100] relative flex justify-center items-center ">
      <i className="text-zinc-300 text-[2.5vw] ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[35vw] mx-5 p-3 text-[1.5vw] outline-none border-none bg-transparent text-zinc-200"
        type="text"
        placeholder="Search Anything"
      />
      {query.length > 0 ? (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-300 text-[3vw] ri-close-fill hover:cursor-pointer"
        ></i>
      ) : (
        <i className="text-[3vw] text-transparent ri-close-fill"></i>
      )}

      <div className="absolute min-w-[45vw] max-h-[50vh] top-[90%] bg-zinc-200 overflow-auto ">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type || title}/details/${s.id}`}
            key={i}
            className="hover:bg-zinc-300 text-zinc-600 hover:text-black duration-300 font-semibold p-3 flex items-center justify-start border-b-2 border-zinc-100 w-[100%]"
          >
            <img
              className="w-[5vw] h-[5vw] object-cover rounded-sm mr-[1vw] sha"
              src={s.backdrop_path || s.poster_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.poster_path || s.profile_path}`: noImage}
              alt="img"
            />
            <span className="text-[1.5vw]">
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
