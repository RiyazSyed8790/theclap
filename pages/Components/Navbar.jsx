import Logo from "./Logo";
import Nav_Home from "./Nav_Home";
import Movies from "./Movies";
import TV from "./TV";
import Bookmark from "./Bookmark";
import Link from "next/link";
import React from "react";
export default function Navbar(props){
    return(
        <section className="bg-[#161D2F] w-full h-[10%] md:w-[96px] md:h-full fixed md:mx-8 flex justify-between flex-row md:flex-col items-center px-2  rounded-xl z-20">
            <div className="my-8  justify-between  flex md:block  items-center">
            <Link href={"/"+props.id+"/home"}><Logo /></Link>
            </div>
            <div className=" flex flex-row  md:flex-col ">
                <Link className="navs md:navs-mobile"  href={"/"+props.id+"/home"}><Nav_Home col={props.path==="home"?"white":"#5A698F"} /></Link>
                <Link className="navs md:navs-mobile"   href={"/"+props.id+"/movies"}><Movies  col={props.path==="movies"?"white":"#5A698F"} /></Link>
                <Link className="navs md:navs-mobile"  href={"/"+props.id+"/series"}><TV col={props.path==="series"?"white":"#5A698F"} /></Link>
                <Link className="navs md:navs-mobile"  href={"/"+props.id+"/bookmarks"}><Bookmark col={props.path==="bookmarks"?"white":"#5A698F"} /></Link>
            </div> 
            <Link href={"/"}><img className=" w-10 h-10 rounded-full my-8  whiteBord cursor-pointer" title="Click here to Sign-Out" src={props.prof} /></Link>
        </section>
    )
}