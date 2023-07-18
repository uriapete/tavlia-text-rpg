import { ReactElement } from "react";
import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";

export default interface ISave{
    flags?:number,
    current_location?:number,
}