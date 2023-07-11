import IEnemy from "./entities/IEnemy";

export interface IAdditionalEnemyEncounterChance{
    enemy:IEnemy;
    chance:number;
}

export default interface IEnemyEncounterChance{
    enemy:IEnemy;
    chance:number;
    additionalEnemies:IAdditionalEnemyEncounterChance;
}