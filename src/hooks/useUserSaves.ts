import { useContext, useEffect, useState } from "react";
import { UserToken } from "./Contexts";
import SaveResponse from "../interfaces/SaveResponse";

export default function useUserSaves() {
    const TokenContext = useContext(UserToken)
    const [userSaves, setUserSaves] = useState<null | SaveResponse[]>(null)
    useEffect(() => {
        async function getUserSaves() {
            if (TokenContext === null) {
                return null
            }
            if (TokenContext.userToken === null) {
                return null
            }
            const { userToken } = TokenContext

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/save_files/`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${userToken}`,
                    },
                }
            )

            const respData: SaveResponse[] = await response.json()

            setUserSaves(respData)
        }
        try {
            getUserSaves()
        } catch (error) {
            console.log(error)
        }
    }, [TokenContext])
    return userSaves
}