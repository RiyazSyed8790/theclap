import Navbar from "@/pages/Components/Navbar";
import Searchbar from "@/pages/Components/Searchbar";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Video_Card from "@/pages/Components/Video_Card.jsx";
import Video_Card_sk from "@/pages/Components/Video_Card_sk";
export default function Movies_Page(){
 const router = useRouter();
 const [userData,setUser] = React.useState({
    email:"",
    id:"",
    password:"",
    profilePic:"",
    book:{
        movies:[] as string[],
        tv:[] as string[]
    }
 }); //to store the user data from get request
 const [path,setPath] = React.useState("");
 const [showCard, setShowCard] = React.useState(false); // to introduce a lag so that states are properly rendered
 const [id,setId] = React.useState(router.query.id)  // to catch id from the pathname
 //to handle query data and get info and display section
 const [query,setQuery] = React.useState("");
 function handleSearch(e: { target: { value: React.SetStateAction<string>; }; }){
   setQuery(e.target.value);
  // console.log(e.target.value);
 }
 function postQuery(){
   axios.get(
    // `http://localhost:3000/query/${query}` || for dev
    `https://theclapserver.onrender.com/query/${query}`)
   .then(function(res){
     // console.log(res.data);
      setShowCard(false);
      setTimeout(function(){
         setVideo(res.data);//the below code is to check and convert isBookmarked to true
         setVideo((prevVideo) => {
            return prevVideo.map((videoItem) => {
              if (
                userData &&
                userData.book &&
                (userData.book.movies.includes(videoItem.title) ||
                  userData.book.tv.includes(videoItem.title))
              ) {// console.log("I was here")
                // Create a new object with the updated 'isBookmarked' property
                return {
                  ...videoItem,
                  isBookmarked: true,
                };
              }
              return videoItem;
            });
          });
         setShowCard(true)
      },3000)
   })
   .catch(function(err){
    //  console.log(err);
   })
 }

 //to store all video data
 const [video,setVideo] = React.useState([{
    category:"",
    isBookmarked:false,
    isTrending:false,
    rating:"",
    thumbnail:{
       regular:{
          large:"",
          medium:"",
          small:""
       },
       trending:{
          large:"",
          small:""
       }
    },
    title:"",
    year:0
  }]);
 React.useEffect(function(){
   setId(window.location.pathname.split("/")[1]);
    axios.get(
      // `http://localhost:3000/users/${id}` || for dev
      `https://theclapserver.onrender.com/users/${id}`)
        .then(function (res){
          //  console.log(res);
            setUser(res.data)
          })
          .catch(function (error) {
          //  console.log(error);
          })
    //to get all video data
    axios.get(
      // `http://localhost:3000/` || for dev
      `https://theclapserver.onrender.com/`)
        .then(function (res){
          //  console.log(res.data);
            setVideo(res.data);
          })
          .catch(function (error) {
          //  console.log(error);
          }) 
      setPath(window.location.pathname.split("/")[2]);                
 },[id])
 React.useEffect(() => {
   // Update the 'isBookmarked' property for each video based on the condition
   //console.log(userData)
   setTimeout(()=>{
      setVideo((prevVideo) => {
         return prevVideo.map((videoItem) => {
           if (
             userData &&
             userData.book &&
             (userData.book.movies.includes(videoItem.title) ||
               userData.book.tv.includes(videoItem.title))
           ) {// console.log("I was here")
             // Create a new object with the updated 'isBookmarked' property
             return {
               ...videoItem,
               isBookmarked: true,
             };
           }
           return videoItem;
         });
       });
   },2000)
   setTimeout(() => {
      setShowCard(true);
    }, 3000);
 }, [userData]);
    return(
        <main className=" min-h-screen  md:max-w-screen  bg-[#10141E] text-white">
           <Navbar id={id}  prof={userData.profilePic} path={path} />
           <Searchbar place={"movies"} query={query} change={handleSearch} click={postQuery} />
           <section className=" relative py-28 md:py-20 md:pl-[164px] pl-4 flex flex-col">
            <div className="Recommended">
               <h2 className=" text-3xl outfit font-light">Movies</h2>
               <div className="flex my-4 items-center justify-center md:justify-normal flex-wrap"> 
                  {!showCard&& video.map((each)=>{
                     return <div key={each.title}><Video_Card_sk /></div>
                  })}
                  { showCard  &&
                  video.map((each)=>{
                     return (each.category==="Movie")
                     ?<div key={each.title}><Video_Card
                     isBook={each.isBookmarked} 
                     img={each.thumbnail.regular.large} 
                     title={each.title}
                     year={each.year}
                     type={each.category}
                     rating={each.rating} />
                     </div>
                     :<h2 key={each.title}></h2>
                  })
               }
               </div>
               
            </div>
            
           </section>
        </main>
    )
}