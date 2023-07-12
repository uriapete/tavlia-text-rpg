import IGameLocation from "../../interfaces/locations/IGameLocation";

export default abstract class GameLocation implements IGameLocation{
    constructor(
        private _name:string,
        private _bio:string="",
    ){}

    get name(){
        return this._name
    }

    get bio(){
        return this._bio
    }
}