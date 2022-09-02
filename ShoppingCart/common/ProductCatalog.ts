import { PowerAppsIntegrationService } from "../integrations/PowerAppsIntegrationService";
import { IProduct } from "../interfaces/IProduct";


export class ProductCatalog {
    public products: IProduct[];
    public _service : PowerAppsIntegrationService;

    constructor(products: IProduct[], powerAppsIntegrationService: PowerAppsIntegrationService) {
        this.products = products;
        this._service = powerAppsIntegrationService;
    }
    
    public findProductBySku(sku: string): IProduct | null {
        if(this.products.filter(p => p.sku === sku).length > 0){
            return this.products.filter(p => p.sku === sku)[0];
        } else{
            return null;
        }
    }

    public addItemsToCart(sku: string): IProduct {
        let product = this.products.find(p => p.sku == sku);
        product!.addedToCart = true;
        this.sortProducts();
        return product!;
    }

    public removeItemsFromCart(sku: string): IProduct | undefined {
        let product = this.products.find(p => p.sku === sku);
        if(product != undefined){     
            product.addedToCart = false;
            this.sortProducts();
            return product!;
        }
        return undefined;
    }

    public getCurrentShoppingCart(): IProduct[] {
        return this.products.filter(p => p.addedToCart === true);
    }

    public sortProducts(): void {
        let productsSorted = [...this.products];
        if (productsSorted.length > 0) {
            productsSorted.sort((a: IProduct, b: IProduct) => 
                a.id - b.id
            );
            productsSorted.sort((a: IProduct, b: IProduct) => {
                return (a.addedToCart === b.addedToCart) ? 0 : a.addedToCart ? -1 : 1;
            });
        }
        this.products = productsSorted;
    }
    
}