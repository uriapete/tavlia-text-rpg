import IMagicalAttack from "../../interfaces/skills/IMagicalAttack";
import ISkill from "../../interfaces/skills/ISkill";
import Skill from "./Skill";

export default class MagicalAttack extends Skill implements IMagicalAttack,ISkill{
    constructor(
        name:string,bio:string="",
        protected _manaCost:number,
    ){
        super(name,bio)
    }

    get manaCost(){
        return this._manaCost
    }
}