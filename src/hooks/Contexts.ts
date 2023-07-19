import React, { createContext } from "react";

interface UserContextObject{
    userToken:string|null
    setTokenFn:React.Dispatch<React.SetStateAction<string|null>>
}

export const UserToken=createContext<UserContextObject|null>(null);