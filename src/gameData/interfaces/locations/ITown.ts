import IShop from "../IShop";
import IGameLocation from "./IGameLocation";

export default interface ITown extends IGameLocation{
    shop?:IShop
}