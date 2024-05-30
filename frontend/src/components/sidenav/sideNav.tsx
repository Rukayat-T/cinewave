"use client"
import { useState } from "react";
import { useTheme } from "../themeComponent/themeProvider";

// primary: main background colour,
// secondary: side nav background colour,
// text1: main text colour,
// text2: secondary text colour,
// highlight: icon colour/ highlight colour,

function SideNav() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isOptionActive, setIsOptionActive] = useState("")
    
    const theme = useTheme()
    const t = theme.colors

    const menuOptions = [
        {name: "Home"},
        {name: "Movies"},
        {name: "TV Shows"},
        {name: "Genres"},
        {name: "Trending"},
    ]

    return (
        <div 
        style={{backgroundColor: t.secondary}}
        className={"flex flex-col w-[15%] items-center min-h-screen pt-12 border-r-[1px] border-[solid] border-[#000000]"}>
            
                <input 
                type="text" 
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value)}}
                className="bg-[#3C3C3D] p-0.2 pl-2 rounded w-[85%]" 
                placeholder="search"
                style={{color: t.text1}}/>

                <div className="mt-6 text-[1rem] w-[85%]" style={{color: t.text1}}>
                    {menuOptions.length > 0 && (
                        <>{
                            menuOptions.map(option => (
                                <p 
                                key={option?.name} 
                                className={isOptionActive === option.name ? "mt-[1vh] pl-2 bg-[#494949] cursor-default text-white flex items-center rounded" : "mt-[1vh] pl-2 hover:bg-[#494949] hover:text-white cursor-default flex items-center rounded"}
                                onClick={()=>{setIsOptionActive(option.name)}}>
                                    icon {option?.name}</p>
                            ))
                        }</>
                    )}
                </div>
                
            
        </div>
    );
}

export default SideNav;