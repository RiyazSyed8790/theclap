import Logo from "../Components/Logo";
import Link from "next/link";
import React from "react";
import axios from "axios";
//Note to self: Add warning this account already exists for the given mail id
export default function Signup(){
  const [user,setUser] = React.useState({
    email:"",
    password:"",
    set_pass:""
  }) 
  //the below function to handle state change
  function setFormValue(e: React.ChangeEvent<HTMLInputElement>){
    let {name,value} = e.target;
    setUser((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }
  //form validation
  function validator(){
    if(user.email===""||user.password===""||user.set_pass===""){
      alert("All the fields are required to be filled");
      return false;
    }
    else if(user.password!==user.set_pass){
      alert("Password and Set-Password must match");
      return false
    }
    else if(!user.email.split("").includes("@")){
      alert("Enter a valid email");
      return false
    }
    else{
      return true;
    }
  }
  //the below function to post data to the server 
  function submitForm(e: React.FormEvent<HTMLButtonElement>){
    e.preventDefault();
    validator()?
    axios.post(
      // "http://localhost:3000/users" || for dev
      "https://theclapserver.onrender.com/users",{
          email: user.email,
          password: user.password
        })
        .then(function (response) {
          console.log(response);
          alert("Account created successfully! Redirecting to Login page...");
          window.location.pathname="/"
        })
        .catch(function (error) {
          console.log(error);
        }):console.log("Correct the form")//prints when form is invalid    
  }

  return (
        <main className=" h-screen w-screen flex flex-col justify-center items-center text-white bg-[#10141E] ">
           <div className="mb-8"><Logo /></div>
           <div className=" w-[300px] h-[318px] sm:w-[400px] sm:h-[418px] rounded-3xl bg-[#161D2F]">
             <div className=" mx-4 my-4 sm:mx-8 sm:my-8">
                <h2 className=" outfit text-xl text-center sm:text-left sm:text-3xl">Sign Up</h2>
                <div  className=" sm:my-4">
                  <input id="mail" onChange={(e)=>setFormValue(e)} name="email" value={user.email} className=" w-full relative font-light outfit h-[40px] text-md sm:text-lg  px-2 bg-transparent bot my-2 caret-[#FC4747] focus:outline-none" type="email" placeholder="Email address" />
                  <input onChange={(e)=>setFormValue(e)} name="password" value={user.password} className=" w-full font-light outfit h-[40px] text-md sm:text-lg px-2 bg-transparent bot my-2 caret-[#FC4747] focus:outline-none" type="password" placeholder="Password" />
                  <input onChange={(e)=>setFormValue(e)} name="set_pass" value={user.set_pass} className=" w-full font-light outfit h-[40px] text-md sm:text-lg px-2 bg-transparent bot my-2 caret-[#FC4747] focus:outline-none" type="password" placeholder="Repeat Password" />
                  <button  onClick={(e)=>submitForm(e)} className=" w-full font-light outfit h-[40px] text-md sm:text-lg text-center bg-[#FC4747] rounded-md my-4 sm:my-6">Create an account</button>
                </div>
                <h2 className=" outfit text-sm  text-center">Already have an account? <Link className=" text-[#FC4747]" href="/">Login</Link></h2>
             </div>
           </div>
        </main>
    )
}