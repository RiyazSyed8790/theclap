import Movies from "./Movies";
import Image from "next/image.js";
import React from "react";
import Bookmark from "./Bookmark";
import Empty_Book from "./Empty_Book";
import TV from "./TV";
import axios from "axios";
import Play from "./Play";
//key,img,title,year,type,rating,width,isBook
export default function Video_Card(props){
    //to check if bookmarked
    const [book,setBook] = React.useState(props.isBook)
    //mouse in and mouseout display change
    const [isIn,setCond] = React.useState(false);
    //to get id from path
    const [path,setPath] = React.useState("");
    //on page load
    React.useEffect(function(){
        setPath(window.location.pathname.split("/")[1])
    },[])
    //function to handle bookmark
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
          //  console.log(response);
          })
          .catch(function (error) {
          //  console.log(error);
          })
        :
        axios.post(// 'http://localhost:3000/users/books' || for dev
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
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}  className="outfit min-w-[200px] min-h-[180px] md:min-w-[280px] md:min-h-[230px] mr-0 md:mr-4 my-4  relative">
        <Image priority={true} src={props.img}  className=" w-full h-full rounded-2xl" width="220" height="140" alt="Video_pic" />
        <div className={`z-10 hover:cursor-pointer absolute top-3 right-3 black_bag px-3 py-3 rounded-full`}>
        {book?<Bookmark col="white" click={()=>handleBookmark(props.title,props.type)} />:<Empty_Book click={()=>handleBookmark(props.title,props.type)} />}
        </div>
        <div  style={isIn?{display:"flex"}:{display:"none"}} className=" absolute cursor-pointer justify-center w-full h-[173px] items-center gray_bag rounded-2xl px-3 py-2 top-0">
                     <div className="gray_bag2 px-4 py-2 justify-between items-center flex rounded-3xl">
                        <Play />
                        <h2 className=" outfit text-white text-xl">&nbsp;Play</h2>
                     </div>
                  </div>
        <h2 className=" mt-2 flex items-center text-md font-thin">{props.year}&nbsp;<span className=" outfit font-semibold">&#183;</span>&nbsp;{props.type==="TV Series"?<TV col="#b5b9c9"/>:<Movies col="#b5b9c9" />} &nbsp;{props.type}&nbsp;<span className=" outfit font-semibold">&#183;</span>&nbsp;{props.rating}</h2>
        <h2 className="text-2xl font-medium tracking-wide">{props.title}</h2>
     </div>
    )
}