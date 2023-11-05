import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../Components/Navbar.jsx";
import Searchbar from "../../Components/Searchbar.jsx";
import axios from "axios";
import Trend_Card from "@/pages/Components/Trend_Card.jsx";
import Video_Card from "@/pages/Components/Video_Card.jsx";
import Video_Card_sk from "@/pages/Components/Video_Card_sk.jsx";
import Trend_Card_sk from "@/pages/Components/Trend_Card_sk.jsx";
export default function Home(){
 const router = useRouter();
 //const id = router.query.id; // to catch id from the pathname
 const [id,setId] = React.useState(router.query.id)
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
 //to store videos data
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
 //To check which page is active i.e, 1-> Home , 2-> Movies etc.
 const [active,setActive] = React.useState(1);
 //function to change active page
 function changeActive(e: any){
    setActive(e);
 }
 // run on page load
 const [path,setPath] = React.useState("");
 const [showCard, setShowCard] = React.useState(false);
 const [query,setQuery] = React.useState("");
 function handleSearch(e: { target: { value: React.SetStateAction<string>; }; }){
   setQuery(e.target.value);
   console.log(e.target.value);
 }
 function postQuery(){
   axios.get(
    // `http://localhost:3000/query/${query}` || for dev
    `https://theclapserver.onrender.com/query/${query}`)
   .then(function(res){
      console.log(res.data);
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
              ) { console.log("I was here")
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
      console.log(err);
   })
 }

 React.useEffect(function(){
   //setId(router.query.id);
   setId(window.location.pathname.split("/")[1]);
   //to get videos info
   axios.get(
    // `http://localhost:3000/` || for dev
    `https://theclapserver.onrender.com/`)
        .then(function (res){
          //  console.log(res.data);
            setVideo(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
   //to get user specific data, i.e: profilePic, bookmarks etc. 
   axios.get(
    // `http://localhost:3000/users/${id}` || for dev
    `https://theclapserver.onrender.com/users/${id}`
    )
        .then(function (res){           
            setUser(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    
   setPath(window.location.pathname.split("/")[2]);
 },[id])
 React.useEffect(() => {
   // Update the 'isBookmarked' property for each video based on the condition
   setVideo((prevVideo) => {
     return prevVideo.map((videoItem) => {
       if (
         userData &&
         userData.book &&
         (userData.book.movies.includes(videoItem.title) ||
           userData.book.tv.includes(videoItem.title))
       ) { 
         // Create a new object with the updated 'isBookmarked' property
         return {
           ...videoItem,
           isBookmarked: true,
         };
       }
       return videoItem;
     });
   });
   setTimeout(() => {
      setShowCard(true);
    }, 4000);
 }, [userData]);
    return(   
        <main className=" min-h-screen  md:max-w-screen bg-[#10141E] text-white">
           <Navbar id={id}    prof={userData.profilePic} path={path}  />
           <Searchbar place={"movies or TV series"} query={query} change={handleSearch} click={postQuery} />
           <section className=" relative py-28 md:py-20 md:pl-[164px] pl-4 flex flex-col">
            <div className="Trending">
               <h2 className=" text-3xl outfit font-light">Trending</h2>
               <div className="flex my-4 items-center overflow-x-scroll scrollbar-hide"> 
               {!showCard&& video.map((each)=>{
                     return <div key={each.title}><Trend_Card_sk /></div>
                  })}
               {  showCard &&
                  video.map((each)=>{
                     return (each.isTrending)
                     ?<div key={each.title}><Trend_Card
                     isBook={each.isBookmarked} 
                     img={each.thumbnail.trending.large} 
                     title={each.title}
                     year={each.year}
                     type={each.category}
                     rating={each.rating} />
                     </div>
                     :<h2 key={each.title}> </h2>
                  })
               }
               </div>
            </div>
            <div className="Recommended">
               <h2 className=" text-3xl outfit font-light">Recommended for you</h2>
               <div className="flex my-4 items-center justify-center md:justify-normal flex-wrap"> 
               {!showCard&& video.map((each)=>{
                     return <div key={each.title}><Video_Card_sk /></div>
                  })}
                  { showCard &&
                  video.map((each)=>{
                     return !(each.isTrending)
                     ?<div key={each.title}><Video_Card
                     isBook={each.isBookmarked} 
                     img={each.thumbnail.regular.large} 
                     title={each.title}
                     year={each.year}
                     type={each.category}
                     rating={each.rating} />
                     </div>
                     :<h2 key={each.title}> </h2>
                  })
               }
               </div>
               
            </div>
            
           </section>
        </main>
    )
}