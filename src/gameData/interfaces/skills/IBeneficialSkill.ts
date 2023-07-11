import IPlayerChar from "../entities/IPlayerChar";
import ISkill from "./ISkill";

export default interface IBeneficialSkill extends ISkill{
    execute?(target:IPlayerChar):number|null;
    manaCost?:number;
}