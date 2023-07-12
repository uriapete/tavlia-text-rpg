import IEntity from "./IEntity";
import IMagicalAttack from "../skills/IMagicalAttack";
import IPhysicalAttack from "../skills/IPhysicalAttack";
import ISkill from "../skills/ISkill";

interface LearnableSkill {
    skill: ISkill;

    learnAtLvl: number;
}

export interface IPlayerClass {
    title: string;

    hpBias: number;
    manaBias: number;

    physAttBias: number;
    magicAttBias: number;

    physDefBias: number;
    magicDefBias: number;

    speedBias:number;

    basicSkill: ISkill;
    startingPhysAtts: IPhysicalAttack[];
    startingMagicAtts: IMagicalAttack[];

    learnableSkills: LearnableSkill[];
}

export default interface IPlayerChar extends IEntity{
    name?:string;
    bio?:string;

    level?:number;
    xp?:number;
    xpToNextLv?:number;

    playerClass?:IPlayerClass;
}