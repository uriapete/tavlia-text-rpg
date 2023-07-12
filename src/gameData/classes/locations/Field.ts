import GameLocation from "./GameLocation";
import IField from "../../interfaces/locations/IField";
import IGameLocation from "../../interfaces/locations/IGameLocation";
import Enemy from "../entities/Enemy";

export default class Field extends GameLocation implements IGameLocation,IField {
    constructor(
        public enemies:Enemy[]=[],
        public battleChance:number,
        public size:number,
    ){
        super()
    }
}