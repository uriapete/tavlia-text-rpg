import IDungeon from "../../interfaces/locations/IDungeon";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import DungeonLevel from "./DungeonLevel";
import GameLocation from "./GameLocation";

export default class Dungeon extends GameLocation implements IGameLocation,IDungeon{
    public completed=false;
    constructor(
        name:string,
        private _levels:DungeonLevel[],
        bio="",
    ){
        super(name,bio)
    }
    get levels(){
        return this._levels
    }

    get cleared(){
        return this.levels[-1].cleared
    }
}