import * as React from 'react';
import styles from './Tile.module.scss';
import { ITileProps } from '.';
//import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import {AspectRatio} from "react-aspect-ratio";

export class Tile extends React.Component<ITileProps, {}> {
  public render(): React.ReactElement<ITileProps> {
    const tileStyle: React.CSSProperties = {};
    if (this.props.height) {
      tileStyle.height = `${this.props.height}px`;
    }
    //<Icon iconName={this.props.item.icon} />

    return (
      <div className={styles.tile} style={tileStyle}>
        <a href={this.props.item.url}
          target={this.props.item.target}
          title={this.props.item.title}>
          <div className={styles.tileIcon}>
            <img src={this.props.item.icon} style={{ objectFit:"cover", width: "62px", height:"62px", textAlign:"center", borderRadius:"18px" }} />
          </div>
          <div className={styles.tileTitle}>
            {this.props.item.title}
          </div>
        </a>
      </div>
    );
  };
}
