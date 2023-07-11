import { EntityStatNames } from "./entities/IEntity";

export default interface IEffect{
    primaryNum?:number;
    secondaryNums?:number[];
    affectingStat?:EntityStatNames;
    regenHP?:boolean;
    regenMana?:boolean;
    regenHPAmt?:number;
    regenManaAmt?:number;
    name:string
    bio:string
}