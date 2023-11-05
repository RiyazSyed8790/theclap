import Movies from "./Movies";
import Image from "next/image.js";
import React from "react";
import Bookmark from "./Bookmark";
import Empty_Book from "./Empty_Book";
import TV from "./TV";
//key,img,title,year,type,rating,width
export default function Trend_Card(props){
    let width1="min-w-[400px] min-h-[200px] md:min-w-[470px] md:min-h-[230px]";
    return(
        <div className={`relative cursor-pointer ${width1} skeleton rounded-2xl   mx-3 md:mr-6`}>
                  <div className="skeleton rounded-2xl "></div>
                  <div className=" w-full h-[159px] rounded-2xl bg-white skeleton" ></div>
                  <h2 className="text-2xl  w-full skeleton"></h2>
        </div>
    )
}