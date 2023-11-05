import Search from "./Search";
import React from "react";
export default function Searchbar(props){
    function checker(e){
        e.key==="Enter"?(props.click()):""
    }
    return(
        <div className=" fixed  md:left-[164px] my-14 w-full py-4  md:my-0 md:py-6  flex bg-[#10141E] z-20">
            <div onClick={props.click} className="mx-2"><Search /></div>
            <input onKeyDown={(e)=>checker(e)} onChange={(e)=>props.change(e)} value={props.query} className=" outfit mx-2 bg-transparent w-[80vw]  focus:outline-none caret-[#FC4747] focus:bot" type="text" placeholder={`Search for ${props.place}`} />
        </div>
    )
}