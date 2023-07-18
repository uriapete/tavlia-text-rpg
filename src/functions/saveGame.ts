import { ReactElement, useContext } from "react";
import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";
import { UserToken } from "../hooks/Contexts";
import ISaveData from "../interfaces/ISaveData";

export default async function saveGame(campaign:Campaign,location?:GameLocationConnections){
    const userTokenContext=useContext(UserToken)
    if(userTokenContext===null){
        return null
    }

    const {userToken}=userTokenContext

    const saveData:ISaveData={
        campaign_data:JSON.stringify(campaign),
        current_location:JSON.stringify(location),
    }

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/save_files/`,
        {
            method: "POST",
            body:JSON.stringify(saveData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${userToken}`,
            },
        }
    )

    const respData=await response.json()

    return respData
}