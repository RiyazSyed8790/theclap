import Movies from "./Movies";
import Image from "next/image.js";
import React from "react";
import Bookmark from "./Bookmark";
import Empty_Book from "./Empty_Book";
import TV from "./TV";
import axios from "axios";
import Play from "@/pages/Components/Play"
//key,img,title,year,type,rating,width
export default function Trend_Card(props){
    let hide={
      display:"none"
    }
    //to check if bookmarked
    const [book,setBook] = React.useState(props.isBook)
    //mouse in and mouseout display change
    //to get id from path
    const [path,setPath] = React.useState("");
    const [isIn,setCond] = React.useState(false);
    //function to handle bookmark
    let width1="min-w-[400px] min-h-[200px] md:min-w-[470px] md:min-h-[230px]";
    //on page load
   React.useEffect(function(){
         setPath(window.location.pathname.split("/")[1])
     },[])
    function handleBookmark(name,catg){
      setBook((prev)=>(!prev));
      book?
      axios.post(
        // 'http://localhost:3000/users/del_books' || for dev
        'https://theclapserver.onrender.com/users/del_books', {
          id : path,
          title : name,
          type : catg 
        })
        .then(function (response) {
         // console.log(response);
        })
        .catch(function (error) {
        //  console.log(error);
        })
      :
      axios.post(
        // 'http://localhost:3000/users/books' || for dev
        'https://theclapserver.onrender.com/users/books', {
          id : path,
          title : name,
          type : catg 
        })
        .then(function (response) {
        //  console.log(response);
        })
        .catch(function (error) {
        //  console.log(error);
        });
  }
  function handleEnter(){setCond(true)}
  function handleLeave(){setCond(false)}

    return(
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}  className={`relative cursor-pointer ${width1}   mx-3 md:mr-6`}>
                  <Image priority={true} alt="video thumbnail" className=" rounded-2xl" src={props.img} width="470" height="230" />
                  <div className={`z-10 hover:cursor-pointer absolute top-5 right-5 black_bag px-3 py-3 rounded-full`}>
                     {book?<Bookmark col="white" click={()=>handleBookmark(props.title,props.type)} />:<Empty_Book click={()=>handleBookmark(props.title,props.type)} />}
                  </div>
                  <div  style={isIn?{display:"flex"}:hide} className=" absolute  justify-center w-full h-full items-center gray_bag rounded-2xl px-3 py-2 top-0">
                     <div className="gray_bag2 px-4 py-2 justify-between items-center flex rounded-3xl">
                        <Play />
                        <h2 className=" outfit text-white text-xl">&nbsp;Play</h2>
                     </div>
                  </div>
                  <div className=" flex justify-start items-end absolute h-full w-full bottom-0 px-5 py-4 black_bag ">
                     <div className="flex flex-col text-left outfit">   
                        <h2 className=" flex items-center text-md font-thin">{props.year}&nbsp;<span className=" outfit font-semibold">&#183;</span>&nbsp;{props.type==="TV Series"?<TV col="#b5b9c9"/>:<Movies col="#b5b9c9" />} &nbsp;{props.type}&nbsp;<span className=" outfit font-semibold">&#183;</span>&nbsp;{props.rating}</h2>
                        <h2 className="text-2xl font-medium tracking-wide">{props.title}</h2>
                     </div>
                  </div>
                  </div>
    )
}