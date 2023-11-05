import Logo from "./Components/Logo";
import Link from "next/link";
import React from "react";
import axios from "axios";
export default function Page() {
  const [login,setLogin] = React.useState({
    email:"",
    password:""
  })
  //to check if user exists
  const [exist,setExist] = React.useState(false);
  //set the user id to redirect
  const [id,setId] = React.useState("");
  //show warning for account doesn't exist
  const [show,setShow] = React.useState(false);
  //If exist becomes true redirect to rickroll page (youtube)
  React.useEffect(function(){
    if(exist){
      //window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      setShow(false);
      window.location.pathname = `/${id}/home`
    }
  },[exist,id,show])
  //function to handle change in login data
  function setLoginValue(e: React.ChangeEvent<HTMLInputElement>){
    let {name,value} = e.target;
    setLogin((prev)=>{
      return {
        ...prev,
        [name]: value
      }
    })
  }
  //validator function for login data
  function validator(){
    if(login.email===""||login.password===""){
      alert("All the fields are required to be filled");
      return false;
    }
    else if(!login.email.split("").includes("@")){
      alert("Enter a valid email");
      return false
    }
    else{
      return true;
    }
  }
  //submithandler function
  function loginHandler(){
   validator()?
   axios.get(
    // 'http://localhost:3000/users'|| for dev
   'https://theclapserver.onrender.com/users')
        .then(function (res){
            let users = res.data.users;
            users.map((each: any)=>{
              if(each.email===login.email && each.password===login.password){
                setExist(true);
                setId(each.id);
                //console.log("existed for", each.email, "with", each.password);
              }
              else{
                setShow(true);
              }
              return each;
            })
          })
          .catch(function (error) {
            //console.log(error);
          }):console.log("Correct the login data!")
  }
    return (
        <main className=" h-screen w-screen flex flex-col justify-center items-center text-white bg-[#10141E] ">
           <div className="mb-8"><Logo /></div>
           <div className=" w-[300px] h-[270px] sm:w-[400px] sm:h-[373px] rounded-3xl bg-[#161D2F]">
             <div className=" mx-4 my-4 sm:mx-8 sm:my-8">
                <h2 className=" outfit text-xl  sm:text-left sm:text-3xl">Login</h2>
                <div className=" sm:my-4">
                  <input onChange={(e)=>setLoginValue(e)} name="email" value={login.email} className=" w-full  font-light outfit h-[40px] text-md sm:text-lg  px-2 bg-transparent bot my-2 focus:outline-none" type="email" placeholder="Email address" />
                  <input onChange={(e)=>setLoginValue(e)} name="password" value={login.password} className=" w-full font-light outfit h-[40px] text-lg px-2 bg-transparent bot my-2 focus:outline-none" type="password" placeholder="Password" />
                  <button onClick={loginHandler} className=" w-full font-light outfit h-[40px] text-md sm:text-lg text-center bg-[#FC4747] rounded-md my-4 sm:my-8">Login to your account</button>
                </div>
                <h2 className=" outfit text-md  text-center">{show?"Account doesn't exist!":"Don't have an account?"} <Link className=" text-[#FC4747]" href="/signup">Sign Up</Link></h2>
             </div>
           </div>
        </main>
    )
  }