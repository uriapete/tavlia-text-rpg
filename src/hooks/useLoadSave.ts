import { useContext, useEffect } from "react"
import { UserToken } from "./Contexts"
import SaveResponse from "../interfaces/SaveResponse"
import { GameLocationConnections } from "../gameData/classes/Campaign"
import { AccessFlagTypes } from "../gameData/interfaces/ICampaign"

export default function useLoadSave(
    locations: GameLocationConnections[],
    setCurrLoc: (gameLoc:GameLocationConnections)=>any,
    saveID?:number|null
){
    const TokenContext = useContext(UserToken)
    
    useEffect(()=>{
        async function getSaveData(){
            if(TokenContext===null||typeof saveID==="undefined"||saveID===null){
                return null
            }
            const{userToken}=TokenContext

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/save_files/${saveID}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${userToken}`,
                    },
                }
            )

            const respData: SaveResponse = await response.json()

            let flagCount=0

            for (let i = 1; i < locations.length; i++) {
                const location = locations[i];

                if(i===respData.current_location){
                    setCurrLoc(location)
                }

                if(flagCount<respData.flags){
                    if(typeof location.accessFlag!=="undefined"){
                        switch (location.accessFlag.type) {
                            case AccessFlagTypes.Visited:
                                location.accessFlag.location.visit()
                                break;
                        
                            default:
                                break;
                        }
                    }
                }

                if(i>=respData.current_location&&flagCount>=respData.flags){
                    break
                }
            }
        }
        try {
            getSaveData()
        } catch (error) {
            console.log(error)
        }
    },[TokenContext,locations,saveID,setCurrLoc])
}