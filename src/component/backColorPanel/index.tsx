import * as React from 'react';
import './index.scss'
import classNames from 'classnames';

interface IProps {
    style?: React.CSSProperties;
    tableBordered?: boolean
}

/**
 *
 * @author lk
 * @date 2020/4/10 10:28
 * @version 1.0
 */
export default class BackColorPanel extends React.Component<IProps> {

    public render() {
        const {style, tableBordered} = this.props
        const className = classNames({
            'app-backcolor-panel': true,
            'app-backcolor-panel-table': tableBordered
        });
        return (
            <div className={className} style={style}>
                {this.props.children}
            </div>
        )
    }
}
