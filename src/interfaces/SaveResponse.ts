import ISaveData from "./ISaveData";

export default interface SaveResponse extends ISaveData{
    flags:number
    current_location:number
    user:number
    created_on:string
    last_updated:string
}