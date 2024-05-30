"use client"
import { useTheme } from "@/components/themeComponent/themeProvider";

function Home() {
    const theme = useTheme();
    const t = theme.colors
    return (
        <div 
        style={{backgroundColor: t.primary, color: t.text1}} 
        className="w-[88%] min-h-full pl-3">
            Home
        </div>
    );
}

export default Home;