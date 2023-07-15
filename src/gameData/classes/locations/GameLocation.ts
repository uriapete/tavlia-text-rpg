import IGameLocation from "../../interfaces/locations/IGameLocation"

export default abstract class GameLocation implements IGameLocation{
    private _visited:boolean
    constructor(
        private _name:string,
        private _bio:string="",
    ){
        this._visited=false
    }

    get name(){
        return this._name
    }

    get bio(){
        return this._bio
    }
    
    get visited(){
        return this._visited
    }

    public visit(){
        this._visited=true
    }
}