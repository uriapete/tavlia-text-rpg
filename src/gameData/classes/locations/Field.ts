import GameLocation from "./GameLocation";
import IField from "../../interfaces/locations/IField";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import Enemy from "../entities/Enemy";

export default class Field extends GameLocation implements IGameLocation,IField {
    constructor(
        name:string,
        public battleChance:number,
        public size:number,
        public enemies:Enemy[]=[],
        bio="",
    ){
        super(name,bio)
    }
}