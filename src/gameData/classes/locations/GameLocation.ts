import IGameLocation, { AccessFlagTypes, IAccessFlag } from "../../interfaces/locations/IGameLocation";

export class AccessFlag implements IAccessFlag{
    constructor(
        private _type:AccessFlagTypes,
        private _location:GameLocation
    ){}
    public get type(){
        return this._type
    }
    public get location(){
        return this._location
    }
}

export default abstract class GameLocation implements IGameLocation{
    private _visited:boolean
    constructor(
        private _name:string,
        private _bio:string="",
        private _accessFlag?:AccessFlag
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

    get accessFlag(){
        return this._accessFlag
    }
}