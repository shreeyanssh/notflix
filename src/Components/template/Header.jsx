/*For header we are using an api that gives the image of a movie that has been trending 
in the time frame that you provide*/

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div className="relative w-full h-[50vh] ">
      <Link
        to={`/${data.media_type}/details/${data.id}`}
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,.8)), 
        url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path || data.profile_path
        })`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
        className="w-full h-[50vh] flex flex-col justify-end p-[3%] hover:cursor-pointer items-start absolute"
      >
        <h1 className="text-white text-[3vw] font-bold ">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <div className="w-[70%] text-white mt-[1vw] text-[1vw]">
          {data.overview.slice(0, 200)}...
          <div
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            {" "}
            more
          </div>
        </div>
        <p className="text-white flex text-[1vw] my-[1vw]">
          <i className="ri-megaphone-fill text-white"></i>&nbsp;&nbsp;
          {data.release_date || "No Information"}
          <i className="ri-album-fill text-white ml-[1vw]"></i>&nbsp;&nbsp;
          {data.media_type.toUpperCase()}
        </p>
      </Link>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="mt-[1vw] p-[.5vw] bg-[#a92e2c] rounded-lg text-[1vw] text-white relative top-[45vh] left-[2vw]"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
