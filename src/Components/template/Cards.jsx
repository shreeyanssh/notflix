import React from "react";
import { Link } from "react-router-dom";
import noImage from "/netflix.svg";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap min-w-screen bg-[#1f1e24] min-h-screen pl-[4vw]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[15vw] mx-[4vw] my-[2vw] " key={i}>
          <img
            className="h-[25vw] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] hover:shadow-[8px_17px_38px_2px_rgba(255,255,255,.2)]"
            src={
              c.backdrop_path || c.poster_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.backdrop_path || c.poster_path || c.profile_path
                  }`
                : noImage
            }
            alt="img"
          />
          <h1 className="text-[1.5vw] text-zinc-400 font-semibold bg-transparent">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>

            {c.vote_average ? (<div className="relative font-bold text-[1.5vw] bottom-[10vw] left-[13vw] rounded-full bg-[#a92e2c] text-white w-[4vw] h-[4vw] flex justify-center items-center">
            {(c.vote_average * 10).toFixed()} <sup>%</sup>
          </div>) : null}
          
        </Link>
      ))}
    </div>
  );
};

export default Cards;
