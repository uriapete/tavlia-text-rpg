import { ReactElement } from "react";
import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";

export default interface ISave{
    campaign:Campaign,
    location:GameLocationConnections,
    text?:ReactElement[]
}