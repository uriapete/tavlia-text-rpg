import IEnemyEncounterChance from "../IEnemyEncounterChance";
import ILocation from "./ILocation";



export default interface IField extends ILocation{
    size:number;

    encounterableEnemies:IEnemyEncounterChance;
}