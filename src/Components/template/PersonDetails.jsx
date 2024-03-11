import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../../Store/Actions/PersonActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removePerson } from "../../Store/Reducers/PeopleSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");

  document.title = info
    ? `${
        info.detail.name ||
        info.detail.title ||
        info.detail.original_name ||
        info.detail.original_title
      }`
    : "Person Detail";

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info ? (
    <div className="px-[5%] w-screen overflow-auto">
      {/* Part 1 Navigation */}

      <nav className="h-[7vw] items-center w-full text-zinc-100 flex gap-10 text-[2vw] ">
        <Link
          onClick={() => navigate(-1)}
          className="text-[2vw] hover:text-[3vw] ri-arrow-left-line hover:text-[#a92e2c] duration-100 text-zinc-100"
        ></Link>

        <Link
          to="/"
          className="text-[2vw] hover:text-[3vw] ri-home-2-fill hover:text-[#a92e2c] duration-100 text-zinc-100"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* Part 2 Poster and Details*/}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_30px_2px_rgba(0,0,0,0.5)] w-full h-[20vw] object-cover"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt=""
          />

          <hr className="mt-[2vw] mb-[1vw] border-none h-[.2vw] bg-zinc-500" />
          {/* Social Media Links */}
          <div className="text-zinc-100 flex text-[2vw] justify-between">
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalId.twitter_id}`}
            >
              <i className="ri-twitter-x-fill hover:text-[3vw]  hover:text-[#a92e2c] duration-100"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill hover:text-[3vw]  hover:text-[#a92e2c] duration-100"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
            >
              <i className="ri-instagram-fill hover:text-[3vw]  hover:text-[#a92e2c] duration-100"></i>
            </a>

            <a
              className="hover:text-[#a92e2c] hover:text-[3vw] duration-100 "
              target="_blank"
              href={`https://www.imdb.com/name/${info.externalId.imdb_id}`}
            >
              imdb
            </a>
          </div>

          {/* Personal Information */}
          <div>
            <h1 className="text-[2vw] text-zinc-100 font-semibold my-[1vw]">
              Personal Info
            </h1>
          </div>

          <div className="flex gap-[1vw] items-center">
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              Known For:
            </h1>
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              {info.detail.known_for_department}
            </h1>
          </div>

          <div className="flex gap-[1vw] items-center">
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              Gender:
            </h1>
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>
          </div>

          <div className="flex gap-[1vw] items-center">
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              Birthday:
            </h1>
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              {info.detail.birthday}
            </h1>
          </div>

          <div className="flex gap-[1vw] items-center">
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              Place Of Origin:
            </h1>
            <h1 className="text-[1vw] text-zinc-300 font-semibold my-[.5vw]">
              {info.detail.place_of_birth}
            </h1>
          </div>
        </div>

        {/* Part 3 Right Details and Information */}
        <div className="w-[80%] ml-[5vw]">
          <h1 className="text-[5vw] text-zinc-300 font-semibold">
            {info.detail.name}
          </h1>

          <h1 className="text-[2vw] text-zinc-300 font-semibold my-[.5vw]">
            Biography
          </h1>

          <p className="text-[1.2vw] text-zinc-300 font-semibold my-[.5vw]">
            {info.detail.biography}
          </p>

          <h1 className="text-[2vw] text-zinc-300 font-semibold my-[2vw]">
            Worked in
          </h1>

          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between my-[2vw]">
            <h1 className="text-[2vw] text-zinc-300 font-semibold my-[.5vw]">
              Casted in
            </h1>

            <Dropdown
              title="Catgory"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="w-full h-[30vw] my-[2vw] overflow-x-hidden overflow-y-auto text-zinc-300 shadow-xl shadow-[rgba(200,200,200,0.3)] border-zinc-600 border-2">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white hover:bg-[#19191d] duration-300 cursor-pointer m-3 p-5">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name ||
                      c.title ||
                      c.original_name ||
                      c.original_title}  
                  </span>
                  {c.character && <span> : As {c.character}</span>}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
