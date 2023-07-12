import IBeneficialSkill from "../../interfaces/skills/IBeneficialSkill";
import ISkill from "../../interfaces/skills/ISkill";
import Skill from "./Skill";

export default class BeneficialSkill extends Skill implements IBeneficialSkill,ISkill{
    constructor(
        name:string,bio:string="",
        protected _manaCost:number=0,
    ){
        super(name,bio)
    }

    get manaCost(){
        return this._manaCost
    }
}