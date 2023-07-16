import IEntity from "./entities/IEntity";

export default interface IItem{
    name:string;
    bio:string;
    primaryNum?:number;
    secondaryNums?:number[];
    use?(target?:IEntity):number|string|null;
}