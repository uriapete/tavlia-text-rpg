import GameLocation from "./GameLocation";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import ITown from "../../interfaces/locations/ITown";

export default class Town extends GameLocation implements ITown,IGameLocation{
    private _isTown:boolean
    constructor(
        name:string,
        bio="",
    ){
        super(name,bio)
        this._isTown=true
    }
    public get isTown(){
        return this._isTown
    }
}

export function isTown(loc:GameLocation):loc is Town{
    return "isTown" in loc
}