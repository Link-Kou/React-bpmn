import * as React from 'react';
import FlexCalcBox from '@component/flexCalcBox';
import _ from 'lodash';
import {utilsBoolean} from '@utils/index';
import QueueAnim from 'rc-queue-anim';
import {LoaderIcons} from '@component/panel';
import {Svg} from '@resource/svg';

interface IProps {

    /**
     * 是否加载中
     * true 显示
     * false 不显示
     */
    loadering?: boolean

    /**
     * 加载Loding
     */
    onLoader?(loadering: boolean, value: {
        title: string, hideLoaderIcons: boolean, hide: boolean
    }): { title: string, hideLoaderIcons: boolean, hide: boolean }

    /**
     * 显示子控件
     */
    onShow?(): void

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


interface IPriProps extends IProps {

    title?: string,

    /**
     * 隐藏 Loader 组件
     */
    hideLoaderComponent?: boolean

}

export default class Index extends React.Component<IProps> {

    private _Loader(title: string, hideLoaderComponent: boolean = false) {
        return (
            <div style={{position: 'relative', textAlign: 'center', top: '50%'}}>
                {hideLoaderComponent ? undefined : <LoaderIcons/>}
                <p style={{marginTop: hideLoaderComponent ? 0 : 30, color: '#d6d6d6'}}>
                    {hideLoaderComponent ? <><Svg.RedataCompon size={'2x'}/><br/></> : undefined}
                    {title}
                </p>
            </div>
        )
    }


    private _QueueAnim = (queueAnim: boolean = true) => {
        const {onShow} = this.props
        onShow?.()
        if (queueAnim) {
            return (
                <QueueAnim type={['alpha', 'right']}
                           leaveReverse={true}
                           ease={['easeInOutQuad', 'easeInBack']}>
                    <div key='a'>
                        {this.props.children}
                    </div>
                </QueueAnim>
            )
        }
        return this.props.children
    }


    private outrender(props: IPriProps) {
        const {loadering, title, subHeight, height, queueAnim, hideLoaderComponent} = props
        //const _subHeight = _.isNumber(subHeight) ? subHeight : 58
        const _title = _.isString(title) ? title : '页面初始化中,请稍后....'
        return (
            loadering ?
                <FlexCalcBox height={height} subHeight={subHeight} overflow={'auto'} Body={(e) => (
                    <>
                        {this._Loader(_title, hideLoaderComponent)}
                    </>
                )}/>
                :
                this._QueueAnim(queueAnim)
        )
    }

    private inrender(props: IPriProps) {
        const {loadering, title, subHeight, height, queueAnim, hideLoaderComponent} = props
        //const _subHeight = _.isNumber(subHeight) ? subHeight : 58
        const _title = _.isString(title) ? title : '页面初始化中,请稍后....'
        return (
            <FlexCalcBox height={height} subHeight={subHeight} overflow={'auto'} Body={(e) => (
                loadering ?
                    <>
                        {this._Loader(_title, hideLoaderComponent)}
                    </>
                    :
                    this._QueueAnim(queueAnim)
            )}/>
        )
    }


    public render() {
        const {onLoader, loadering, outrender} = this.props
        const _loadering = utilsBoolean.toBooleanGetDefault(loadering, true);
        if (onLoader) {
            const {title, hideLoaderIcons, hide} = onLoader(_loadering, {
                title: '页面初始化中,请稍后....', hideLoaderIcons: false, hide: _loadering
            });
            const newProps = {
                ...this.props,
                loadering: hide,
                title: title,
                hideLoaderComponent: hideLoaderIcons
            }
            return outrender ? this.outrender(newProps) : this.inrender(newProps)
        }
        const newProps = {
            ...this.props,
            loadering: _loadering,
            title: '页面初始化中,请稍后....'
        }
        return outrender ? this.outrender(newProps) : this.inrender(newProps)

    }
}

