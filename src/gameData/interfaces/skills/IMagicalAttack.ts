import IEnemy from "../entities/IEnemy";
import ISkill from "./ISkill";

export default interface IMagicalAttack extends ISkill{
    execute?(target:IEnemy):number|null;
    manaCost:number;
}