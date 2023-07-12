import GameLocation from "./GameLocation";
import IDungeonLevel from "../../interfaces/locations/IDungeonLevel";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import Enemy from "../entities/Enemy";

export default class DungeonLevel extends GameLocation implements IDungeonLevel,IGameLocation{
    constructor(
        private _enemies:Enemy[],
    ){
        super()
    }

    public get enemies(){
        return this._enemies
    }
}