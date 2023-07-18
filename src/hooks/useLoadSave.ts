import { useContext, useEffect, useState } from "react"
import { UserToken } from "./Contexts"
import SaveResponse from "../interfaces/SaveResponse"
import ISaveData from "../interfaces/ISaveData"

export default function useLoadSave(saveID?:number|null){
    const TokenContext = useContext(UserToken)
    const [saveData, setSaveData] = useState<null|SaveResponse>(null)
    useEffect(()=>{
        function getSaveData(){}
    },[])
    return saveData

}