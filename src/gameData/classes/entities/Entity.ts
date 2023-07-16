import IEntity, { DmgReturn } from "../../interfaces/entities/IEntity";
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

    public isDead(): boolean {
        return this.currHP<=0
    }

    public takePhysDmg(amt: number): DmgReturn {
        const alreadyDead=this.isDead()
        if(alreadyDead){
            return{
                dmg:0,
                killed:alreadyDead
            }
        }
        let dmg = amt - this.physDef
        if (dmg<1){
            dmg=1
        }
        this.currHP-=dmg;
        return {
            dmg,
            killed:this.isDead()
        };
    }
    public takeMagicDmg(amt: number): DmgReturn {
        const alreadyDead=this.isDead()
        if(alreadyDead){
            return{
                dmg:0,
                killed:alreadyDead
            }
        }
        let dmg = amt - this.magicDef
        if (dmg<1){
            dmg=1
        }
        this.currHP-=dmg;
        return {
            dmg,
            killed:this.isDead()
        };
    }

    public healHP(amt: number): number {
        let healAmt: number = amt
        if (this.currHP + healAmt > this.maxHP) {
            healAmt = this.maxHP - this.currHP
        }
        this.currHP += healAmt
        return healAmt
    }

    public useMana(amt: number): number|boolean {
        let manaUsed=amt;

        if(manaUsed>this.currMana){
            return false
        }

        if (manaUsed<0){
            manaUsed=0
        }
        this.currMana-=manaUsed
        return manaUsed
    }

    public healMana(amt: number): number{
        let healAmt:number=amt
        if(this.currMana+healAmt>this.maxMana){
            healAmt=this.maxMana-this.currMana
        }
        this.currMana+=healAmt
        return healAmt
    }

    useBasicSkill(target:Entity): boolean|DmgReturn {
        return this.basicSkill.use(this,target)
    }
}