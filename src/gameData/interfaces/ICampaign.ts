import PlayerChar from "../classes/entities/PlayerChar";
import IGameLocation from "./locations/IGameLocation";

export interface IGameLocationConnections{
    location:IGameLocation
    connections:IGameLocation[]
}

export default interface ICampaign{
    playerChar:PlayerChar
    locations:IGameLocationConnections[]
    flag:number
    completionFlag:number
}