import React from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return ytvideo ? (
    <div className="text-white z-[10] bg-[rgba(0,0,0,.9)] absolute top-[5vh] left-auto w-[90%] h-[90%] flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute top-0 right-0 text-[3vw] hover:text-[4vw] ri-close-fill hover:text-[#a92e2c] duration-100 text-zinc-100"
      ></Link>
      <ReactPlayer
        controls
        height="90%"
        width="90%"
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  ) : (
    <div className="text-white z-[10] bg-[rgba(0,0,0,.9)] absolute top-[5vh] left-auto w-[90%] h-[90%] flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute top-0 right-0 text-[3vw] hover:text-[4vw] ri-close-fill hover:text-[#a92e2c] duration-100 text-zinc-100"
      ></Link>
      <NotFound />
    </div>
  );
};

export default Trailer;
