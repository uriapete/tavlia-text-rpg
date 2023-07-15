export enum AccessFlagTypes {
    visited = "visited",
    cleared = "cleared",
}

export interface IAccessFlag {
    type: AccessFlagTypes,
    location: IGameLocation,
}

export default interface IGameLocation{
    name?:string
    bio?:string
    accessFlag?:IAccessFlag
    visited?:boolean
}