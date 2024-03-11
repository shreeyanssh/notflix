import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../Utils/Axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title="Notflix | Trending ";

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
        
      if(data.results.length>0){
          setTrending((prevState) => [...prevState,...data.results]);   //setTrending such that it saves the prev data and calls for new data and stores it all in one array.
          setPage(page+1);
          console.log(data)
        }
        else{
            setHasMore(false);
        }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if(trending.length === 0){
        GetTrending();
    }else{
        setPage(1);
        setTrending([]);
        GetTrending();
    }
  }

  useEffect(() => {
    refreshHandler();   //if the category or duration changes the page refreshes
  }, [category, duration]);


  return trending.length ? (
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
          &nbsp;Trending
        </h1>

        <div className="flex pl-[7vw] justify-between">
          <div className="pr-[3vw]">
            <Topnav />
          </div>

          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Trending"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <div className="">
        <InfiniteScroll 
            dataLength={trending.length}
            next={GetTrending}
            hasMore={hasMore}
            loader={<h1 className="text-white bg-[#1f1e24]">Loading...</h1>}
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
