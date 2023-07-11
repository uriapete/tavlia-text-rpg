import IShop from "../IShop";
import ILocation from "./ILocation";

export default interface ITown extends ILocation{
    shop:IShop
}