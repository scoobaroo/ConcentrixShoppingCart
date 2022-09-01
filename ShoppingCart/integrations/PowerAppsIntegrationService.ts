import { IDropdownOption } from "@fluentui/react";
import { IInputs } from "../generated/ManifestTypes";
import { IProduct } from "../interfaces/IProduct";

/**
 * This integration service handles requests and response to PowerApps/Dynamics CRM.
 */
export class PowerAppsIntegrationService {

    private context: ComponentFramework.Context<IInputs>;

    constructor(context: ComponentFramework.Context<IInputs>) {
        this.context = context;
    }

    /**
     * 
     * @param schemaName The schema name for the environment variable to pull data from
     * @returns The environment variable value for the specified schema name
     */
    public async getProducts(): Promise<IProduct[]> {
        const result = await this.context.webAPI.retrieveMultipleRecords("cntx_product") as any;
        console.log(result);
        let products : IProduct[] = []
        result.entities.forEach((p : any)=>{
            let product : IProduct = {
                sku: p["cntx_sku"],
                id: p["cntx_id"],
                addedToCart: false,
                description: p["cntx_description"],
                attribute1Name: p["cntx_attribute1name"],
                attribute2Name: p["cntx_attribute2name"],
                attribute1Value: p["cntx_attribute1value"],
                attribute2Value: p["cntx_attribute2value"],
                regPrice: p["cntx_regprice"],
                categories: p["cntx_categories"],
                name: p["cntx_name"],
                inStock: p["cntx_instock"],
                stock: p["cntx_stock"]
            }
            products.push(product);
        });
        return products;
    }

    public async retrieveDataFromEnvironmentVariable(schemaName: string): Promise<string> {
        let queryString: string = `?$select=value&$expand=EnvironmentVariableDefinitionId($select=schemaname)&$filter=(EnvironmentVariableDefinitionId/schemaname eq '${schemaName}')&$top=1`;
        const response = await this.context.webAPI.retrieveMultipleRecords("environmentvariablevalue", queryString);
        const url = response.entities[0]["value"];
        return url;
    }

    public async retrieveConfiguration(schemaName: string): Promise<number> {
        let queryString: string = `?$select=cntx_value&$filter=(cntx_name eq '${schemaName}')&$top=1`;
        const response = await this.context.webAPI.retrieveMultipleRecords("cntx_configuration", queryString);
        const configValue = response.entities[0]["cntx_value"] as number;
        return configValue;
    }
}