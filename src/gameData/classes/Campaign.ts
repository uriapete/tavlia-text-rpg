import ICampaign, { IGameLocationConnections } from "../interfaces/ICampaign";
import PlayerChar from "./entities/PlayerChar";

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
    constructor(
        private _playerChar:PlayerChar,
        private _completionFlag:number,
        private _locations:GameLocationConnections[]=[],
        private _flag:number=0
    ){}

    public get playerChar(){
        return this._playerChar
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

    public iterateFlag(){
        this._flag++
        return this._flag>=this.completionFlag
    }

    public checkComplete(){
        return this._flag >= this.completionFlag
    }
}