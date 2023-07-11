import IEntity from "./entities/IEntity";

export default interface IItem{
    name:string;
    bio:string;
    use?(target?:IEntity):number|string|null;
}