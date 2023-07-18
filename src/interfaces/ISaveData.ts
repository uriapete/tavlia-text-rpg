import { ReactElement } from "react";
import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";

export default interface ISave{
    campaign_data:string,
    current_location?:string,
}