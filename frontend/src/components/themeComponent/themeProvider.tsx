"use client"
import { createContext, useContext, useEffect, useState } from "react"

// primary: main background colour,
// secondary: side nav background colour,
// text1: main text colour,
// text2: secondary text colour,
// highlight: icon colour/ highlight colour,

type Theme = {
    colors: {
        primary: string;
        secondary: string;
        text1: string;
        text2: string;
        highlight: string;
    }
}

const darkMode: Theme = {
    colors: {
        primary: "#2D2D2D",
        secondary: "#303030",
        text1: "#FFFFFF",
        text2: "#A0A0A0",
        highlight: "#148DFE",
    }
}

const lightMode: Theme = {
    colors: {
        primary: "#FFFFFF",
        secondary: "#DBDBDB",
        text1: "#272727",
        text2: "#9D9D9D",
        highlight: "#148DFE",
    }
}

const ThemeContext = createContext<Theme>(darkMode);

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
    
const isSystemDark = window?.matchMedia("(prefers-color-scheme:dark)").matches
const [isDark, setIsDark] = useState(isSystemDark)

const checkSetting = () => {
    window?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',({ matches }) => {
    if (matches) {
        setIsDark(true)
    } else {
        setIsDark(false)
    } 
    })
}

    useEffect(()=>{
        checkSetting()
    },[])

   
    return (
        <ThemeContext.Provider value={isDark ? darkMode : lightMode}>
        {children}
        </ThemeContext.Provider>
        )

}

export const useTheme = () => useContext(ThemeContext)