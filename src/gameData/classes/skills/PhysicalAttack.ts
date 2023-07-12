import IPhysicalAttack from "../../interfaces/skills/IPhysicalAttack";
import ISkill from "../../interfaces/skills/ISkill";
import Entity from "../entities/Entity";
import Skill from "./Skill";

export default class PhysicalAttack extends Skill implements IPhysicalAttack,ISkill{
    constructor(
        name:string,
        private power:number,
        bio = "",
    ){
        super(name,bio)
    }
    public attack(user:Entity,target:Entity){
        return target.takePhysDmg(user.physAtt*this.power)
    }
}