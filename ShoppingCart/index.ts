import { IColumn } from "@fluentui/react";
import React = require("react");
import ReactDOM = require("react-dom");
import { App } from "./components/App";
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { PowerAppsIntegrationService } from "./integrations/PowerAppsIntegrationService";
import { IProduct } from "./interfaces/IProduct";


export class ShoppingCart implements ComponentFramework.StandardControl<IInputs, IOutputs> {


    private _container: HTMLDivElement;
	private _props: IAppProps;
	private _service: PowerAppsIntegrationService;
	private notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */
    constructor()
    {
        
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.notifyOutputChanged = notifyOutputChanged;
		this._container = container;
		this._service = new PowerAppsIntegrationService(context);
		context.mode.trackContainerResize(true);
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public async updateView(context: ComponentFramework.Context<IInputs>): Promise<void>
    {
        let taxRate: number = await this._service.retrieveConfiguration("Tax Rate");
        taxRate = taxRate/100;
		let products: IProduct[] = await this._service.getProducts();
		this._props = {
            taxRate,
			shoppingCart: this,
			componentContext: context,
            products
		}
		ReactDOM.render(
			React.createElement(App, this._props),
			this._container
		);

        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        ReactDOM.unmountComponentAtNode(this._container);
    }
}
