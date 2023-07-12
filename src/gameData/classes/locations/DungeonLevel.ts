import GameLocation from "./GameLocation";
import IDungeonLevel from "../../interfaces/locations/IDungeonLevel";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import Enemy from "../entities/Enemy";

export default class DungeonLevel extends GameLocation implements IDungeonLevel, IGameLocation {
    public cleared:boolean
    constructor(
        private _enemies:Enemy[],
        bio="",
        name="",
    ){
        super(name,bio)
        this.cleared=false
    }

    public get enemies(){
        return this._enemies
    }
}