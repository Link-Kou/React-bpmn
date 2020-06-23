import * as React from 'react';
import {DOMHelper as _} from 'rsuite';

interface IProps {

    /**
     * 定义容器的高度 默认为！100VH
     * 自定义高度不会优先级最高，不会执行subHeight
     */
    height?: number

    /**
     * 100vh - subHeight = 实际的高度
     */
    subHeight?: number

    /**
     * 样式
     */
    style?: React.CSSProperties;

    /**
     * 返回控件
     * @param e 高度信息
     * @constructor
     */
    Body(height: number, width: number): any

    /**
     * 超出样式
     * 默认：hidden
     */
    overflow?: 'auto' | 'clip' | 'hidden' | 'scroll' | 'visible' | string

    /**
     * 延迟渲染
     */
    delay?: number

}

/**
 * 盒子布局
 */
export default class FlexCalcBox extends React.Component<IProps> {


    private _wrapper: HTMLDivElement | null | undefined;

    public state = {
        height: 0,
        width: 0,
        style: this.props.style,
        boxheight: this.props.height,
        subHeight: this.props.subHeight,
        overflow: typeof this.props.overflow === 'undefined' ? 'hidden' : this.props.overflow,
        components: ''
    }

    public componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
        if (this._wrapper) {
            this.setState({
                height: _.getHeight(this._wrapper),
                width: _.getWidth(this._wrapper)
            })
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        this.setState({
            style: nextProps.style,
            boxheight: nextProps.height,
            subHeight: nextProps.subHeight,
            overflow: nextProps.overflow
        })
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    public handleResize = (e: any) => {
        if (this._wrapper) {
            this.setState({
                height: _.getHeight(this._wrapper),
                width: _.getWidth(this._wrapper)
            });
        }
    }

    public getHeightStyle(boxheight: any, subHeight: any) {
        const reactappsubheight: any = String(process.env.REACT_APP_SubHeight)
        if (boxheight !== undefined && boxheight !== null) {
            return boxheight
        }
        if (subHeight !== undefined) {
            return `calc(100vh - ${subHeight}px)`
        }
        if (reactappsubheight) {
            return `calc(100vh - ${reactappsubheight}px)`
        }
        return '100vh'
    }

    /**
     * 延迟渲染
     * @private
     */
    private async _settime() {
        const {delay} = this.props
        setTimeout(() => {
            this.setState({
                components: this.props.Body(this.state.height, this.state.width)
            })
        }, delay ?? 0)
    }

    public render() {
        const {boxheight, subHeight, components, style} = this.state
        const {overflow} = this.props
        const overflowstring = typeof overflow === 'undefined' ? 'hidden' : overflow
        this._settime()
        return (
            <div style={{
                height: this.getHeightStyle(boxheight, subHeight),
                overflow: overflowstring,
                ...style
            }}
                 ref={ref => {
                     this._wrapper = ref;
                 }}
            >
                {components}
            </div>
        )
    }

}
