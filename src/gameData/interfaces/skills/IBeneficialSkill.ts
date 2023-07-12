import IEntity from "../entities/IEntity";
import ISkill from "./ISkill";

export default interface IBeneficialSkill extends ISkill{
    manaCost?:number;
}