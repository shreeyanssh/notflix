import React, { useEffect, useState } from "react";
import Sidenav from "./template/Sidenav";
import Topnav from "./template/Topnav";
import axios from "../Utils/Axios";
import Header from "./template/Header";
import HorizontalCards from "./template/HorizontalCards";
import Dropdown from "./template/Dropdown";
import Loading from "./template/Loading";

const Home = () => {
  document.title = "Notflix";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      let randomWallpaper =
        data.results[Math.floor(Math.random() * data.results.length)]; //to get a random image out of length of images
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper(); //if no wall paper call getWallpaper
    GetTrending();
  }, [category]);


  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className=" flex justify-between p-5">
          <h1 className="text-[2vw] text-zinc-200 font-semibold">Trending</h1>
          <Dropdown title="Filter" options={["all","tv", "movie" ]} func={(e)=>setCategory(e.target.value)}/>
        </div>

        <HorizontalCards data={trending} title={category}/>
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
