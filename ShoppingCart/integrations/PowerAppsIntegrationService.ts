import { IDropdownOption } from "@fluentui/react";
import { IInputs } from "../generated/ManifestTypes";

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
    public async retrieveDataFromEnvironmentVariable(schemaName: string): Promise<string> {
        let queryString: string = `?$select=value&$expand=EnvironmentVariableDefinitionId($select=schemaname)&$filter=(EnvironmentVariableDefinitionId/schemaname eq '${schemaName}')&$top=1`;
        const response = await this.context.webAPI.retrieveMultipleRecords("environmentvariablevalue", queryString);
        const url = response.entities[0]["value"];
        return url;
    }


}