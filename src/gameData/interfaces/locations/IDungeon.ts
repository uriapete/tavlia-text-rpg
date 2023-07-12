import IItem from "../IItem";
import IDungeonLevel from "./IDungeonLevel";
import IGameLocation from "./IGameLocation";

export default interface IDungeon extends IGameLocation {
    levels:IDungeonLevel[]
    goldReward?:number
    itemReward?:IItem
}