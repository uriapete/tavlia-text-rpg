import IItem from "../IItem";
import IEnemy from "../entities/IEnemy";
import IGameLocation from "./IGameLocation";

export default interface IDungeonLevel extends IGameLocation{
    enemies:IEnemy[]
    itemRewards?:IItem[]
    goldReward?:number
}