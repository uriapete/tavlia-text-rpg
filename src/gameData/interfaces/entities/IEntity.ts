import IInventorySlot from "../IInventorySlot";
import IMagicalAttack from "../skills/IMagicalAttack";
import IPhysicalAttack from "../skills/IPhysicalAttack";
import ISkill from "../skills/ISkill";

export default interface IEntity{
    name?:string;
    bio?:string;

    maxHP:number;
    // get maxHP():number;
    // set maxHP(value:number);
    
    maxMana:number;
    // get maxMana():number;
    // set maxMana(value:number);
    
    currHP:number;
    // get currHP():number;
    
    currMana:number;
    // get currMana():number;

    physAtt:number;
    magicalAtt:number;

    physDef:number;
    magicDef:number;

    speed:number;

    basicSkill:ISkill;

    physSkills:IPhysicalAttack[];

    magicSkills:IMagicalAttack[];

    inventory:IInventorySlot[];

    takeDmg(amt:number):number|void;
    healHP(amt:number):number|void;
    useMana?(amt:number):number|void;
    healMana?(amt:number):number|void;
}