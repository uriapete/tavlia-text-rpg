import IEntity from "../entities/IEntity";

export default interface ISkill{
    execute?(target:IEntity):number|null;
    primaryNum?:number;
    secondaryNums?:number[];
    manaCost?:number;
    name:string;
    bio:string;
}