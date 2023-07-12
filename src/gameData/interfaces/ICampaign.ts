import IGameLocation from "./locations/IGameLocation";

export interface IGameLocationConnections{
    location:IGameLocation
    connections:IGameLocation[]
}

export default interface ICampaign{
    locations:IGameLocation[]
    flag:number
    completionFlag:number
    locConnects:IGameLocationConnections[]
}