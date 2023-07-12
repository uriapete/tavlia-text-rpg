import IDungeon from "../../interfaces/locations/IDungeon";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import DungeonLevel from "./DungeonLevel";
import GameLocation from "./GameLocation";

export default class Dungeon extends GameLocation implements IGameLocation,IDungeon{
    public completed=false;
    constructor(
        private _levels:DungeonLevel[]
    ){
        super()
    }
    get levels(){
        return this._levels
    }
}