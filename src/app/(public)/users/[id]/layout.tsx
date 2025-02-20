import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'UsersIdLayout metadata'
}
type Props = {children:React.ReactNode}
const UsersIdLayout = ({children}:Props)=>{
    return(
        <>
            {children}
        </>
    )
}
export default UsersIdLayout;