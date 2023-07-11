import IItem from "../IItem";
import IEnemy from "../entities/IEnemy";
import ILocation from "./ILocation";

export default interface IDungeonLevel extends ILocation{
    enemies:IEnemy[]
    itemRewards?:IItem[]
    goldReward?:number
}