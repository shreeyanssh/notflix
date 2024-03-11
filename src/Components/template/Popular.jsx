import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../Utils/Axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
    let navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Notflix | Popular ";

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]); //setPopular such that it saves the prev data and calls for new data and stores it all in one array.
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setPopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler(); //if the category or duration changes the page refreshes
  }, [category]);

  return popular.length ? (
    <div className=" w-full h-full bg-[#1f1e24]">
      <div className="w-auto my-[2vw] px-[2vw] h-[10vh] flex item-center">
        <h1
          onClick={() => navigate("/")}
          className="pt-[1.5vh] text-[2vw] font-semibold hover:text-[#a92e2c] duration-100 text-zinc-400 hover:cursor-pointer "
        >
          <i
            onClick={() => navigate(-1)}
            className="text-[2vw] ri-arrow-left-line hover:text-[#a92e2c] duration-100"
          ></i>
          &nbsp;Popular
        </h1>

        <div className="flex pl-[20vw] justify-between">
          <div className="pr-[3vw]">
            <Topnav />
          </div>

          <Dropdown
            title="Category"
            options={["movie", "person", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <div className="">
        <InfiniteScroll
          dataLength={popular.length}
          next={GetPopular}
          hasMore={hasMore}
          loader={<h1 className="text-white bg-[#1f1e24]">Loading...</h1>}
        >
          <Cards data={popular} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
