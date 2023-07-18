import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";
import ISaveData from "../interfaces/ISaveData";

export default async function saveGame(userToken:string, campaign:Campaign,location?:GameLocationConnections){

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