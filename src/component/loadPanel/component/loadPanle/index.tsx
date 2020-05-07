import * as React from 'react';
import {Loader} from '@component/loadPanel';
import FlexCalcBox from '@component/flexCalcBox';
import compose from 'recompose/compose';
import _ from 'lodash';
import {utilsObject} from '@utils/index';
import QueueAnim from 'rc-queue-anim';

interface IProps {
    /**
     * 是否加载中
     * true 不显示
     * false 显示
     */
    hideLoader: boolean | undefined

    title?: string,
    /**
     * 隐藏 Loader 组件
     */
    hideLoaderComponent?: boolean,

    subHeight?: number

    height?: number

    /**
     * 是否进行外部渲染
     */
    outrender?: boolean

    /**
     * 是否进行动画关闭
     */
    queueAnim?: boolean
}

class LoadComponent extends React.Component<IProps> {

    private _Loader(title: string, hideLoaderComponent: boolean = false) {
        return (
            <div style={{position: 'relative', textAlign: 'center', top: '50%'}}>
                {hideLoaderComponent ? undefined : <Loader/>}
                <p style={{marginTop: hideLoaderComponent ? 0 : 30, color: '#d6d6d6'}}>
                    {title}
                </p>
            </div>
        )
    }


    private _QueueAnim = (queueAnim: boolean = true) => {
        if (queueAnim) {
            return (
                <QueueAnim type={['alpha', 'right']}
                           ease={['easeInOutQuad', 'easeInBack']}>
                    <div key='a'>
                        {this.props.children}
                    </div>
                </QueueAnim>
            )
        } else {
            return this.props.children
        }
    }

    private outrender({...props}) {
        const {hideLoader, title, subHeight, hideLoaderComponent, height, queueAnim} = props
        const _subHeight = _.isNumber(subHeight) ? subHeight : 58
        const _title = _.isString(title) ? title : '页面初始化中,请稍后....'
        return (
            !hideLoader || utilsObject.isUndefined(hideLoader) ?
                <FlexCalcBox height={height} subHeight={_subHeight} overflow={'auto'} Body={(e) => (
                    <>
                        {this._Loader(_title, hideLoaderComponent)}
                    </>
                )}/>
                :
                this._QueueAnim(queueAnim)
        )
    }

    private inrender({...props}) {
        const {hideLoader, title, subHeight, hideLoaderComponent, height, queueAnim} = props
        const _subHeight = _.isNumber(subHeight) ? subHeight : 58
        const _title = _.isString(title) ? title : '页面初始化中,请稍后....'
        return (
            <FlexCalcBox height={height} subHeight={_subHeight} overflow={'auto'} Body={(e) => (
                !hideLoader || utilsObject.isUndefined(hideLoader) ?
                    <>
                        {this._Loader(_title, hideLoaderComponent)}
                    </>
                    :
                    this._QueueAnim(queueAnim)
            )}/>
        )
    }

    public render() {
        return <>
            {this.props.outrender ? this.outrender(this.props) : this.inrender(this.props)}
        </>
    }
}

export default compose<any, IProps>()(LoadComponent);

