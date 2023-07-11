import IEnemy from "../entities/IEnemy";
import ISkill from "./ISkill";

export default interface IPhysicalAttack extends ISkill{
    execute?(target:IEnemy):number|null
}