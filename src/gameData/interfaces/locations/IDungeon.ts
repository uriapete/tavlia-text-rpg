import IItem from "../IItem";
import IDungeonLevel from "./IDungeonLevel";
import ILocation from "./ILocation";

export default interface IDungeon extends ILocation {
    levels:IDungeonLevel[]
    goldReward?:number
    itemReward?:IItem
}