import PlayerChar from "../classes/entities/PlayerChar";
import IGameLocation from "./locations/IGameLocation";

export interface IGameLocationConnections{
    location:IGameLocation
    connections:IGameLocation[]|IGameLocationConnections[]
}

export default interface ICampaign{
    playerChar:PlayerChar
    locations: IGameLocation[] | IGameLocationConnections[]
    flag:number
    completionFlag:number
}