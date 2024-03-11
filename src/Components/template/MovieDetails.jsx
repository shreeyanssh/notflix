import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../../Store/Actions/MovieActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeMovie } from "../../Store/Reducers/MovieSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);

  document.title = info
    ? `${
        info.detail.name ||
        info.detail.title ||
        info.detail.original_name ||
        info.detail.original_title
      }`
    : "Movie Detail";

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,.8)), 
      url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-screen px-[3%] overflow-auto"
    >
      {/* Part 1 Navigation */}

      <nav className="h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-[2vw] ">
        <Link
          onClick={() => navigate(-1)}
          className="text-[2vw] hover:text-[3vw] ri-arrow-left-line hover:text-[#a92e2c] duration-100 text-zinc-100"
        ></Link>

        <Link
          to = "/movie"
          className="text-[2vw] hover:text-[3vw] ri-home-2-fill hover:text-[#a92e2c] duration-100 text-zinc-100"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill hover:text-[3vw]  hover:text-[#a92e2c] duration-100"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-fill hover:text-[3vw]  hover:text-[#a92e2c] duration-100"></i>
        </a>

        <a
          className="hover:text-[#a92e2c] hover:text-[3vw] duration-100 "
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and Details*/}
      <div className="w-full flex ">
        <img
          className="h-[30vw] w-[30vw] md:h-[25vw] md:w-[20vw] mt-[2vw] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] hover:shadow-[8px_17px_38px_2px_rgba(255,255,255,.2)]"
          src={
            info.detail.backdrop_path ||
            info.detail.poster_path ||
            info.detail.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.poster_path || info.detail.backdrop_path
                }`
              : noImage
          }
          alt="img"
        />

        <div className="content ml-[10vw] text-white">
          <h1 className="text-[3vw] font-bold ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-[1.5vw] font-bold text-zinc-200">
              &nbsp;&nbsp;({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex text-white text-[1.5vw] items-center gap-[2vw] mt-[.75vw]">
            <h1 className="w-[1vw] font-semibold text-[2vw] leading-6 mr-[3vw]">
              User Score
            </h1>
            {info.detail.vote_average ? (
              <span className="font-bold text-[1.5vw] rounded-full bg-[#a92e2c] text-white w-[4vw] h-[4vw] flex justify-center items-center">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
            ) : null}

            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-[2vw] font-semibold italic text-white mt-[1vw]">
            {info.detail.tagline}
          </h1>

          <h1 className="text-[1.5vw] font-semibold italic text-white mt-[.5vw]">
            Overview:
          </h1>
          <p className="text-[1.2vw]">{info.detail.overview}</p>

          <h1 className="text-[1.5vw] font-semibold italic text-white mt-[.5vw]">
            Languages:
          </h1>
          <p className="text-[1.2vw] mb-[5%]">{info.translations.join(", ")}</p>

          <Link
            className="py-[1vw] px-[1vw] bg-[#9c3832] rounded-lg text-[1.5vw] hover:bg-[#c0251d]"
            to={`${pathname}/trailer`}
          >
            <i className="text-[1.5vw] mr-[1vw] ri-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Watch Provider*/}
      <div className="">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="text-white flex gap-[1vw] my-[1vw]">
            <h1 className="text-[1.5vw]">Available on: </h1>
            {info.watchProviders.flatrate.map((w,i) => (
              <img
                key={i}
                title={`${w.provider_name}`}
                className="w-[2vw] h-[2vw] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="noImage"
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="text-white flex gap-[1vw] my-[1vw]">
            <h1 className="text-[1.5vw]">Available on rent: </h1>
            {info.watchProviders.rent.map((w) => (
              <img
                title={`${w.provider_name}`}
                className="w-[2vw] h-[2vw] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="noImage"
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="text-white flex gap-[1vw] my-[1vw]">
            <h1 className="text-[1.5vw]">Available to buy: </h1>
            {info.watchProviders.buy.map((w) => (
              <img
                title={`${w.provider_name}`}
                className="w-[2vw] h-[2vw] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="noImage"
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Recommendations and similar's*/}

      <div className="my-[4vw] text-white text-[2vw] ">
        <h1 className="mb-[1vw]">Recommendations and Similars</h1>
        <HorizontalCards
          data={
            info.recommendations.length ? info.recommendations : info.similar
          }
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
