import IEntity from "../../interfaces/entities/IEntity";
import IBeneficialSkill from "../../interfaces/skills/IBeneficialSkill";
import ISkill from "../../interfaces/skills/ISkill";
import Entity from "../entities/Entity";
import Skill from "./Skill";

export default class BeneficialSkill extends Skill implements IBeneficialSkill,ISkill{
    constructor(
        name:string,
        private healPower:number,
        protected _manaCost:number=0,
        bio: string = "",
    ){
        super(name,bio)
    }

    get manaCost(){
        return this._manaCost
    }

    public use(user:Entity,target=user):boolean{
        if(user.useMana(this.manaCost)===false){
            return false
        }
        target.healHP(this.healPower)
        return true
    }
}