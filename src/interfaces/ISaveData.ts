import { ReactElement } from "react";
import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";

export default interface ISaveData{
    flags?:number,
    current_location?:number,
}