import IItem from "./IItem";

export interface IShopListing {
    item:IItem;
    cost:number;
    numToSell?:number;
    maxNumToSell?:number
}

export default interface IShop{
    name?:string;
    welcomeText?:string;
    listings:IShopListing[]
}