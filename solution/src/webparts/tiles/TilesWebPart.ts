import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'TilesWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { Tiles, ITilesProps, ITileInfo } from './components';

export interface ITilesWebPartProps {
  collectionData: ITileInfo[];
  //title: string;
}

export default class TilesWebPart extends BaseClientSideWebPart<ITilesWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;

  public render(): void {
    const element: React.ReactElement<ITilesProps> = React.createElement(
      Tiles,
      {
        //title: this.properties.title,
        collectionData: this.properties.collectionData,
        displayMode: this.displayMode,
        /*fUpdateProperty: (value: string) => {
          this.properties.title = value;
        }*/
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldNumber } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                this.propertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: strings.tilesDataLabel,
                  panelHeader: strings.tilesPanelHeader,
                  manageBtnLabel: strings.tilesManageBtn,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "url",
                      title: strings.urlField,
                      type: this.customCollectionFieldType.string
                    },
                    {
                      id: "icon",
                      title: "Imagen/Icono",
                      type: this.customCollectionFieldType.string
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
