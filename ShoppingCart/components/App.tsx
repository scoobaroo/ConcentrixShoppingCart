import { Stack, IStackProps } from '@fluentui/react'
import * as React from "react";
import { useEffect, useState } from "react";
import { ProductCatalog } from '../common/ProductCatalog';

import { IInputs } from "../generated/ManifestTypes";
import { PowerAppsIntegrationService } from "../integrations/PowerAppsIntegrationService";
import { IAppProps } from '../interfaces/IAppProps';

const horizontalStackProps: IStackProps = {
    horizontal: true,
    tokens: { childrenGap: 16 },
};

export const App: React.FC<IAppProps> = (props: IAppProps) => {
    const componentContext = props.componentContext;
    let powerAppsService: PowerAppsIntegrationService = new PowerAppsIntegrationService(props.componentContext);

    const [catalog, setCatalog] = useState<ProductCatalog>(new ProductCatalog(props.products, powerAppsService));
    
    return (

        <Stack>
            Hello
        </Stack>

    );
}