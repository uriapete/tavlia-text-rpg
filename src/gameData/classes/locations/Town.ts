import GameLocation from "./GameLocation";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import ITown from "../../interfaces/locations/ITown";

export default class Town extends GameLocation implements ITown,IGameLocation{
    constructor(
        name:string,
        bio="",
    ){
        super(name,bio)
    }
}