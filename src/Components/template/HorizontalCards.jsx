import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="w-full flex h-[25vw] overflow-y-hidden rounded-lg px-5">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          key={i}
          className="min-w-[20%] h-full mr-5 mb-5 hover:bg-zinc-700 bg-zinc-900 rounded-lg "
        >
          {d.poster_path || d.backdrop_path || d.profile_path ? (
            <img
              className="w-full h-[65%] object-cover object-top rounded-b-none rounded-t-lg"
              src={`https://image.tmdb.org/t/p/original/${
                d.poster_path || d.backdrop_path || d.profile_path
              }`}
              alt=""
            />
          ) : (
            <img src="/netflix.svg" alt="No Image"></img>
          )}
          <div className="text-white p-[.5vw]">
            <h1 className=" text-[1.2vw] mt-[.5vw] font-bold ">
              {(d.name || d.title || d.original_name || d.original_title).slice(
                0,
                17
              )}
            </h1>

            <p className="w-[90%] mt-[.5vw] text-[1vw]">
              {d.overview.slice(0, 40)}...
              <span className="text-zinc-500"> more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
