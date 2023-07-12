import IEnemyEncounterChance from "../IEnemyEncounterChance";
import IGameLocation from "./IGameLocation";



export default interface IField extends IGameLocation{
    size?:number;

    encounterableEnemies?:IEnemyEncounterChance;
}