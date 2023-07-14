import ICampaign, { IGameLocationConnections } from "../interfaces/ICampaign";
import GameLocation from "./locations/GameLocation";
import PlayerChar from "./entities/PlayerChar";

export class GameLocationConnections implements IGameLocationConnections{
    constructor(
        private _location:GameLocation,
        private _connections:GameLocationConnections[]=[]
    ){}

    public get location(){
        return this._location
    }

    public get connections(){
        return this._connections
    }

    public set connections(newConns:GameLocationConnections[]){
        this._connections=newConns
    }

    public addConnections(...newConns:GameLocationConnections[]){
        this._connections.push(...newConns)
    }
}

export default class Campaign implements ICampaign{
    constructor(
        private _playerChar:PlayerChar,
        private _completionFlag:number,
        private _locations:GameLocationConnections[]=[],
        // private _connections:GameLocationConnections[]=[],
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

    public addLocations(...newLocs:GameLocationConnections[]){
        return this._locations.push(...newLocs)
    }
}