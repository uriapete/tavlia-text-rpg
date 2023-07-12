import IPlayerChar from "../../interfaces/entities/IPlayerChar";
import Skill from "../skills/Skill";
import Entity from "./Entity";

export default class PlayerChar extends Entity implements IPlayerChar, Entity {
    constructor(
        maxHP: number, maxMana: number, physAtt: number, physDef: number, magicAtt: number, magicDef: number, speed: number, basicSkill: Skill,
    ) {
        super(maxHP, maxMana, physAtt, physDef, magicAtt, magicDef, speed, basicSkill,)
    }
}

