import IGameLocation from "./locations/IGameLocation";

export interface IGameLocationConnections{
    location:IGameLocation
    connections:IGameLocation[]
}

export default interface ICampaign{
    locations:IGameLocationConnections[]
    flag:number
    completionFlag:number
}