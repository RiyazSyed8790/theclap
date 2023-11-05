import Movies from "./Movies";
import Image from "next/image.js";
import React from "react";
import Bookmark from "./Bookmark";
import Empty_Book from "./Empty_Book";
import TV from "./TV";
export default function Video_Card_sk(props){
    return(
        <div  className="outfit min-w-[280px] min-h-[230px] md:min-w-[280px] md:min-h-[230px] mr-2 md:mr-4 my-4 bg-[#10141E] skeleton rounded-2xl relative">
        <div className=" w-full h-[159px] rounded-2xl bg-white skeleton" ></div>
        <h2 className="text-2xl  w-full skeleton"></h2>
     </div>
    )
}