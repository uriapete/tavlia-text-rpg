import IEntity from "../../interfaces/entities/IEntity";
import MagicalAttack from "../skills/MagicalAttack";
import PhysicalAttack from "../skills/PhysicalAttack";
import Skill from "../skills/Skill";

export default abstract class Entity implements IEntity {
    public currHP: number;
    public currMana: number;
    constructor(
        private _maxHP:number,
        private _maxMana:number,
        private _physAtt:number,
        private _physDef:number,
        private _magicAtt:number,
        private _magicDef:number,
        private _speed:number,
        private _basicSkill:Skill,
        private _physSkills:PhysicalAttack[]=[],
        private _magicSkills:MagicalAttack[]=[],
    ) {
        this.currHP=_maxHP
        this.currMana=_maxMana
    }

    get maxHP(){
        return this._maxHP
    }
    protected set maxHP(newVal:number){
        this._maxHP=newVal
    }

    get maxMana(){
        return this._maxMana
    }
    protected set maxMana(newVal:number){
        this._maxMana=newVal
    }

    get physAtt(){
        return this._physAtt
    }
    protected set physAtt(newVal:number){
        this._physAtt=newVal
    }

    get physDef(){
        return this._physDef
    }
    protected set physDef(newVal:number){
        this._physDef=newVal
    }

    get magicAtt(){
        return this._magicAtt
    }
    protected set magicAtt(newVal:number){
        this._magicAtt=newVal
    }

    get magicDef(){
        return this._magicDef
    }
    protected set magicDef(newVal:number){
        this._magicDef=newVal
    }

    get speed(){
        return this._speed
    }
    protected set speed(newVal:number){
        this._speed=newVal
    }

    get basicSkill(){
        return this._basicSkill
    }
    protected set basicSkill(newSkill:Skill){
        this._basicSkill=newSkill
    }

    get physSkills(){
        return this._physSkills
    }

    get magicSkills(){
        return this._magicSkills
    }

    public takePhysDmg(amt: number): number {
        const dmg = amt - this.physDef
        this.currHP-=dmg;
        return dmg;
    }
    public takeMagicDmg(amt: number): number {
        const dmg = amt - this.magicDef
        this.currHP-=dmg;
        return dmg;
    }

    public healHP(amt: number): number | void {
        this.currHP+=amt;
        return amt;
    }    
}