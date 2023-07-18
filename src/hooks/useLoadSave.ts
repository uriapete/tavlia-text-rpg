import { useContext, useEffect, useState } from "react"
import { UserToken } from "./Contexts"
import SaveResponse from "../interfaces/SaveResponse"
import ISaveData from "../interfaces/ISaveData"
import { GameLocationConnections } from "../gameData/classes/Campaign"

export default function useLoadSave(locations:GameLocationConnections[],saveID?:number|null){
    const TokenContext = useContext(UserToken)
    const [saveData, setSaveData] = useState<null|SaveResponse>(null)
    useEffect(()=>{
        function getSaveData(){}
    },[])
    return saveData

}