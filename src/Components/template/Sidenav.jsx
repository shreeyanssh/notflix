import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {


  return (
    <>
      <div className="w-[20%] h-full border-r-2 border-zinc-200 p-3 ml-3 overflow-hidden">
        <img
          className="m-auto"
          src="/netflix (1).svg"
          alt="icon"
          style={{ width: "10vw", height: "3vw" }}
        ></img>

        <nav className="flex flex-col text-zinc-400">
          <h1 className="text-zinc-100 font-semibold mt-5 text-[1.5vw]">
            New Feeds
          </h1>

          <Link to="/trending" className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-fire-fill"></i>Trending
          </Link>
          <Link to="/popular" className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-bard-fill"></i>Popular
          </Link>
          <Link to="/movie" className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-movie-2-fill"></i>Movies
          </Link>
          <Link to="/tv" className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-tv-2-fill"></i>TV Shows
          </Link>
          <Link to="/person" className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-team-fill"></i>People
          </Link>
        </nav>

        <hr className="mx-3 my-3 border-none h-0.5 bg-zinc-400" />

        <nav className="flex flex-col text-zinc-400 text-xl">
          <h1 className="text-zinc-100 font-semibold mt-3 text-[1.5vw]">
            Website Information
          </h1>

          <Link className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-information-fill"></i>About
          </Link>
          <Link className="hover:bg-[#a92e2c] hover:text-white duration-300 rounded-md m-1 p-3 text-[1.5vw]">
            <i className="mr-2 ri-phone-fill"></i>Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
