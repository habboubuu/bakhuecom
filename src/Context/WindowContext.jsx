//context dyal bach y7ayd menu tb9a tban ta nbrku 3liha
import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({children}){
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    //yb9a yb9a ytl3 width klma sghar wla kbar
    useEffect(() => {
        function setWindowwidth(){
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", setWindowwidth);
        //CleanUP Function
        return () => {
            window.removeEventListener("resize", setWindowwidth);
        };
    }, []);

    return( 
        <WindowSize.Provider value={{windowSize, setWindowSize}}>{children}</WindowSize.Provider>
    );
}