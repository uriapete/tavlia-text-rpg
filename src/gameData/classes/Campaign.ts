import ICampaign, { IGameLocationConnections } from "../interfaces/ICampaign";

export class GameLocationConnections implements IGameLocationConnections{
    constructor(
        private _location:Location,
        private _connections:Location[]
    ){}

    public get location(){
        return this._location
    }

    public get connections(){
        return this._connections
    }
}

export default class Campaign implements ICampaign{
    private _flag:number
    constructor(
        private _completionFlag:number,
        private _locations:GameLocationConnections[]=[],
    ){
        this._flag=0
    }

    public get locations(){
        return this._locations
    }

    public get flag(){
        return this._flag
    }

    public get completionFlag(){
        return this._completionFlag
    }
}