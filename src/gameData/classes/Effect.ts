import IEffect from "../interfaces/IEffect";

export default class Effect implements IEffect{
    constructor(
        protected _name:string,
        protected _bio:string="",
    ){}

    get name(){
        return this._name
    }
    get bio(){
        return this._bio
    }
}