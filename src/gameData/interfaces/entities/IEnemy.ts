import IEntity from "./IEntity";

export default interface IEnemy extends IEntity{
    name:string;
    bio?:string;
}