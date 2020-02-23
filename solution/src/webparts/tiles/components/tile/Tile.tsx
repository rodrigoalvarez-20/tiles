import * as React from 'react';
import styles from './Tile.module.scss';
import { ITileProps } from '.';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';

export class Tile extends React.Component<ITileProps, {}> {
  public render(): React.ReactElement<ITileProps> {
    return (
      <div className={styles.tile} onClick={()=>{ window.open(this.props.item.url, "_blank") }}>
        <div className="ms-Grid" style={{ width:"100%" }}>
          <div className="ms-Grid-row" style={{ width:"100%" }}> 
            <Image
              src={this.props.item.icon}
              imageFit = {ImageFit.contain}
              height="15vh"
              width="100%"
              style={{ 
                textAlign:"center", 
                borderRadius:"12px" }}/>
          </div>
        </div>
      </div>
    );
  };
}
