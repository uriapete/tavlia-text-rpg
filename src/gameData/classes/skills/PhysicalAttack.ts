import IEntity from "../../interfaces/entities/IEntity";
import IPhysicalAttack from "../../interfaces/skills/IPhysicalAttack";
import ISkill from "../../interfaces/skills/ISkill";
import Skill from "./Skill";

export default class PhysicalAttack extends Skill implements IPhysicalAttack,ISkill{
    constructor(
        name:string,bio="",
        private power:number
    ){
        super(name,bio)
    }
    public attack(user:IEntity,target:IEntity){
        target.takePhysDmg(user.physAtt*this.power)
    }
}