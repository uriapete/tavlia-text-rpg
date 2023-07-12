import IEnemy from "../../interfaces/entities/IEnemy";
import Skill from "../skills/Skill";
import Entity from "./Entity";

export default class Enemy extends Entity implements IEnemy,Entity{
    constructor(
        maxHP: number,maxMana: number,physAtt: number,physDef: number,magicAtt: number,magicDef: number,speed: number,basicSkill: Skill,
        private _name:string,
        private _bio:string="",
    ){
        super(maxHP, maxMana, physAtt, physDef, magicAtt, magicDef, speed, basicSkill,)
    }

    get name(){
        return this._name
    }

    get bio(){
        return this._bio
    }
}

