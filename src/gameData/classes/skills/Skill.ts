import { DmgReturn } from "../../interfaces/entities/IEntity";
import ISkill from "../../interfaces/skills/ISkill";
import Entity from "../entities/Entity";

export default abstract class Skill implements ISkill{
    constructor(
        private _name:string,
        private _bio:string="",
    ){}

    get name(){return this._name}
    protected set name(newName:string){this._name=newName}

    get bio(){return this._bio}
    protected set bio(newBio:string){this._bio=newBio}
    
    public use(user: Entity, target: Entity): boolean|DmgReturn {
        return false
    }
}