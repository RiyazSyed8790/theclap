import Navbar from "@/pages/Components/Navbar";
import Searchbar from "@/pages/Components/Searchbar";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Video_Card from "@/pages/Components/Video_Card";
import Video_Card_sk from "@/pages/Components/Video_Card_sk";
export default function Movies_Page(){
 const router = useRouter();
 const id = router.query.id; // to catch id from the pathname
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
 const [path,setPath] = React.useState("");
 const [query,setQuery] = React.useState("");
 function handleSearch(e: { target: { value: React.SetStateAction<string>; }; }){
   setQuery(e.target.value);
   console.log(e.target.value);
 }
 function postQuery(){
   axios.get(
    // `http://localhost:3000/query/${query}`
   `https://theclapserver.onrender.com/query/${query}`
   )
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
    axios.get(
   //   `http://localhost:3000/users/${id}`
    `https://theclapserver.onrender.com/users/${id}`
    )
        .then(function (res){
            console.log(res);
            setUser(res.data)
          })
          .catch(function (error) {
            console.log(error);
          })
          setPath(window.location.pathname.split("/")[2]);   
    //to get all video data
    //to get videos info
   axios.get( 
  //  `http://localhost:3000/`
    `https://theclapserver.onrender.com/`
   )
   .then(function (res){
     //  console.log(res.data);
       setVideo(res.data);
     })
     .catch(function (error) {
       console.log(error);
     })         
 },[id])
const [showCard,setShowCard] = React.useState(false);
 React.useEffect(() => {
    setTimeout(()=>{
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
    },1000)
    setTimeout(() => {
       setShowCard(true);
     }, 2000);
  }, [userData]);
    return(
        <main className=" min-h-screen  md:max-w-screen md:min-h-screen bg-[#10141E] text-white">
           <Navbar id={id}  prof={userData.profilePic} path={path} />
           <Searchbar place={"bookmarked shows"} query={query} change={handleSearch} click={postQuery} />
           <section className=" relative py-28 md:py-20 md:pl-[164px] pl-4 flex flex-col">
            <div className="Bookmarks">
               { showCard && <h2 className=" text-3xl outfit font-light">{userData.book.movies.length>0?"Bookmarked Movies":"No Bookmarked Movies"}</h2> }
               <div className="flex my-4 items-center justify-center md:justify-normal flex-wrap">
               {!showCard&& video.map((each)=>{
                     return (each.isBookmarked && each.category==="Movie")?
                     <div key={each.title}><Video_Card_sk /></div>
                     :<h2 key={each.title}></h2>
                  })}
                 {  showCard &&
                    video.map((each)=>{
                        return (each.isBookmarked && each.category==="Movie")
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
               { showCard && <h2 className=" text-3xl outfit font-light">{userData.book.movies.length>0?"Bookmarked TV Series":"No Bookmarked TV Series"}</h2> }
               <div className="flex my-4 items-center justify-center md:justify-normal flex-wrap">
               {!showCard&& video.map((each)=>{
                     return (each.isBookmarked && each.category==="TV Series")?
                     <div key={each.title}><Video_Card_sk /></div>
                     :<h2 key={each.title}></h2>
                  })}
                 {  showCard &&
                    video.map((each)=>{
                        return (each.isBookmarked && each.category==="TV Series")
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