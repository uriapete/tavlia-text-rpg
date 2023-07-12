import GameLocation from "./GameLocation";
import IDungeonLevel from "../../interfaces/locations/IDungeonLevel";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import Enemy from "../entities/Enemy";

export default class DungeonLevel extends GameLocation implements IDungeonLevel, IGameLocation {
    private _cleared:boolean
    constructor(
        private _enemies:Enemy[],
        bio="",
        name="",
    ){
        super(name,bio)
        this._cleared=false
    }

    public get enemies(){
        return this._enemies
    }

    public get cleared(){
        return this._cleared
    }

    public toggleCleared(){
        this._cleared=!this._cleared
        return this._cleared
    }

    public set cleared(bool:boolean){
        this._cleared=bool
    }
}