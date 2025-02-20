import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'RecipesIdLayout metadata'
}
type Props = {children:React.ReactNode}
const RecipesIdLayout = ({children}:Props)=>{
    return(
        <>
            {children}
        </>
    )
}
export default RecipesIdLayout;