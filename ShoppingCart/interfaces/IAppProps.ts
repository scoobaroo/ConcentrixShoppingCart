import { ShoppingCart } from "..";
import { IInputs } from "../generated/ManifestTypes";
import { IProduct } from "./IProduct";

export interface IAppProps {
    products: IProduct[];
    taxRate: number;
    componentContext: ComponentFramework.Context<IInputs>;
    shoppingCart: ShoppingCart
}
