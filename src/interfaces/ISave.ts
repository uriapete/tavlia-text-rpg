import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";

export default interface ISave{
    campaign:Campaign,
    location:GameLocationConnections,
}