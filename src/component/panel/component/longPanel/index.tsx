import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

interface IProps {
    /**
     * 单独提取的样式
     */
    padding?: number
    /**
     * 去除高度
     * 高度计算方式 `calc(100% - ${subHeight ?? 0}px)`
     */
    subHeight?: number
    /**
     * 样式
     */
    style?: React.CSSProperties

}

/**
 * 长面板
 * @author lk
 * @date 2021/01/01 10:28
 * @version 1.0
 */
export default class index extends React.Component<IProps> {

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
                     minWidth: 500,
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
