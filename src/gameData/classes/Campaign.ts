import ICampaign, { AccessFlagTypes, IAccessFlag, IGameLocationConnections } from "../interfaces/ICampaign";
import GameLocation from "./locations/GameLocation";
import PlayerChar from "./entities/PlayerChar";
import { isDungeon } from "./locations/Dungeon";

export class AccessFlag implements IAccessFlag {
    constructor(
        private _type: AccessFlagTypes,
        private _location: GameLocationConnections
    ) { }
    public get type() {
        return this._type
    }
    public get location() {
        return this._location
    }
}

export class GameLocationConnections implements IGameLocationConnections{
    constructor(
        private _location:GameLocation,
        private _connections:GameLocationConnections[]=[],
        private _accessFlag?:AccessFlag
    ){}

    public get location(){
        return this._location
    }

    public get visited(){
        return this._location.visited
    }

    public visit(){
        this._location.visit()
    }

    public get accessFlag(){
        return this._accessFlag
    }

    public get cleared() {
        if (isDungeon(this.location)) {
            return this.location.cleared
        } else {
            return undefined
        }
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