import ISkill from "../../interfaces/skills/ISkill";

export default abstract class Skill implements ISkill{
    constructor(
        private _name:string,
        private _bio:string="",
    ){}

    get name(){return this._name}
    protected set name(newName:string){this._name=newName}

    get bio(){return this._bio}
    protected set bio(newBio:string){this._bio=newBio}
}