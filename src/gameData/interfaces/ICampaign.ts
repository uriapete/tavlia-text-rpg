import PlayerChar from "../classes/entities/PlayerChar";
import IGameLocation from "./locations/IGameLocation";

export enum AccessFlagTypes {
    Visited = "VISITED",
    Cleared = "CLEARED",
}

export interface IAccessFlag {
    type: AccessFlagTypes,
    location: IGameLocation|IGameLocationConnections,
}

export interface IGameLocationConnections{
    location:IGameLocation
    visited:boolean
    cleared?:boolean
    connections:IGameLocation[]|IGameLocationConnections[]
    accessFlag?:IAccessFlag
}

export default interface ICampaign{
    playerChar:PlayerChar
    locations: IGameLocation[] | IGameLocationConnections[]
    flag?:number
    completionFlag:IAccessFlag
}