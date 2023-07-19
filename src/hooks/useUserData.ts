import { useContext, useEffect, useState } from "react";
import { UserToken } from "./Contexts";
import UserData from "../interfaces/UserData";
import getUserFromToken from "../functions/getUserFromToken";

export default function useUserData(){
    const TokenContext=useContext(UserToken)
    const [userData, setUserData] = useState<null|UserData>(null)

    useEffect(() => {
        async function retrieveUserDataFromToken() {
            if (TokenContext === null) {
                return null
            }
            if (TokenContext.userToken === null) {
                return null
            }
            setUserData(await getUserFromToken(TokenContext.userToken))
        }
        try {
            retrieveUserDataFromToken()
        } catch (error) {
            console.log(error)
        }
    }, [TokenContext])
    return userData
}