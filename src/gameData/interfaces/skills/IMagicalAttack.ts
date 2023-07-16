import IEnemy from "../entities/IEnemy";
import IEntity from "../entities/IEntity";
import ISkill from "./ISkill";

export default interface IMagicalAttack extends ISkill{
    manaCost:number;
}