import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

interface IProps {
    padding?: number

    subHeight?: number

    style?: React.CSSProperties
}

export default class LongPanel extends React.Component<IProps> {

    public render() {
        const {padding, style, subHeight} = this.props
        return (
            <div id={'app-longPanel'}
                 style={{
                     height: `calc(100% - ${subHeight ?? 0}px)`,
                     //flex: 1,
                     //flexDirection: 'column',
                     overflow: 'auto',
                     position: 'relative',
                     minWidth: 850,
                     padding: padding ? padding : 10,
                     ...style
                 }}>
                <QueueAnim type={['alpha', 'right']}
                           ease={['easeInOutQuad', 'easeInBack']}>
                    <div key='a'>
                        {this.props.children}
                    </div>
                </QueueAnim>
            </div>
        )
    }
}
