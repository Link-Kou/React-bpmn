import * as React from 'react';

import './font/iconfont.css'
import './image.scss'
import classNames from 'classnames';
import {Loader} from '@component/loadPanel';

interface Iprops {
    ImageUrl?: string
}

/**
 * 图片查看器
 */
export default class ImageViewer extends React.Component<Iprops> {

    public state = {
        /**
         * 图片加载
         * loading|error|default|success
         */
        load: 'loading',
        alt: '',
        /**
         * app-img-canvas样式
         */
        styleImgCanvas: {
            width: 100 + '%',
            height: 100 + '%',
            transform: 'rotate(0deg)'
        },
        /**
         * 鼠标点击不放图片,获取到点击图片的坐标
         */
        startXY: {
            x: 0,
            y: 0,
            //是否可以进行拖动
            flag: false
        },
        initial: 100,
        /**
         * 移动中保存坐标
         */
        movingXY: {
            x: 0,
            y: 0,
            endX: 0,
            endY: 0
        },
        /**
         * 移动结束保存坐标
         */
        movingUp: {
            x: 0,
            y: 0
        },
        /**
         * 旋转角度
         */
        rotated: 0
    }

    /**
     * 鼠标移动,按键放开
     * @param e
     * @private
     */
    private _onMouseMovingUp(e: any) {
        const {movingXY, startXY, styleImgCanvas} = this.state
        if (startXY.flag === true) {
            this.setState({
                styleImgCanvas: {
                    ...styleImgCanvas,
                    marginLeft: movingXY.endX,
                    marginTop: movingXY.endY
                },
                startXY: {
                    ...startXY,
                    flag: false
                },
                movingUp: {
                    x: movingXY.endX,
                    y: movingXY.endY
                }
            })
        }
    }

    /**
     * 鼠标移动中
     * @param e
     * @private
     */
    private _onMouseMoving(e: any) {
        const {startXY, styleImgCanvas, movingUp} = this.state
        if (startXY.flag) {
            const midX = e.clientX - startXY.x;
            const midY = e.clientY - startXY.y;
            this.setState({
                styleImgCanvas: {
                    ...styleImgCanvas,
                    marginLeft: movingUp.x + midX,
                    marginTop: movingUp.y + midY
                },
                movingXY: {
                    x: e.clientX,
                    y: e.clientY,
                    endX: movingUp.x + midX || 0,
                    endY: movingUp.y + midY || 0
                }
            })
        }
    }

    /**
     * 鼠标点击图片不分开,准备移动
     * @param e
     */
    private _onMouseDownStarting(e: any) {
        this.setState({
            startXY: {
                ...this.state.startXY,
                x: e.clientX,
                y: e.clientY,
                flag: true
            }
        })
    }

    /**
     * 滚轮进行图片缩放
     * @param e
     * @private
     */
    private _onMouseZoom(e: any) {
        if (e.deltaY > 0) {
            this._onMouseZoomAdd(10);
        } else if (e.deltaY < 0) {
            this._onMouseZoomReduce(10);
        }
    }

    /**
     * 图片放大
     * @param step
     * @private
     */
    private _onMouseZoomAdd(step: any) {
        const {styleImgCanvas, initial} = this.state
        const initials = (initial + step) > 500 ? 500 : (initial + step)
        this.setState({
            initial: initials,
            styleImgCanvas: {
                ...styleImgCanvas,
                width: initials + '%',
                height: initials + '%'
            },
            styleImgMax: {
                maxWidth: 'none',
                maxHeight: 'none',
                width: 'auto',
                height: '100%'
            }
        })
    }

    /**
     * 图片缩小
     * @param step
     * @private
     */
    private _onMouseZoomReduce(step: any) {
        const {styleImgCanvas, initial} = this.state
        const initials = (initial - step) < 20 ? 20 : (initial - step)
        this.setState({
            initial: initials,
            styleImgCanvas: {
                ...styleImgCanvas,
                width: initials + '%',
                height: initials + '%'
            }
        })
    }

    /**
     * 1:1显示复位
     * @private
     */
    private _onRestoration() {
        this.setState({
            styleImgCanvas: {
                width: 100 + '%',
                height: 100 + '%',
                transform: 'rotate(0deg)'
            },
            movingUp: {
                x: 0,
                y: 0
            },
            movingXY: {
                endX: 0,
                endY: 0
            },
            initial: 100,
            rotated: 0
        })
    }

    /**
     * 旋转
     * @param deg
     */
    private _onRotating(deg: number) {
        const degs = this.state.rotated + deg
        this.setState({
            rotated: degs,
            styleImgCanvas: {
                ...this.state.styleImgCanvas,
                transform: `rotate(${degs}deg)`
            }
        })
    }


    /**
     * 视图显示
     * @private
     */
    private renderViewHandle = () => {
        const {load, alt} = this.state
        const {ImageUrl} = this.props
        if (!ImageUrl) {
            return undefined
        }
        if (load === 'error') {
            return undefined
        }
        return (
            <>
                {load === 'loading' ? <Loader/> : undefined}
                <div className="app-img-canvas-handle"
                     style={{opacity: load === 'success' ? 1 : 0}}
                     onMouseMove={(e: any) => {
                         this._onMouseMoving(e)
                     }}
                     onMouseUp={(e: any) => {
                         this._onMouseMovingUp(e)
                     }}
                     onWheel={(e: any) => {
                         this._onMouseZoom(e)
                     }}
                >
                    <div style={this.state.styleImgCanvas} className="app-img-canvas">
                        <img src={ImageUrl}
                             alt={alt}
                             draggable={false}
                             onLoad={() => {
                                 setTimeout(() => {
                                     this.setState({
                                         load: 'success'
                                     })
                                 }, 500)
                             }}
                             onError={() => {
                                 this.setState({
                                     load: 'error'
                                 })
                             }}
                             onMouseDown={(e: any) => {
                                 this._onMouseDownStarting(e)
                             }}/>
                    </div>
                    <div className="app-button-group clr">
                        <span className="app-button iconfont icon-add"
                              onClick={() => {
                                  this._onMouseZoomAdd(20)
                              }}/>
                        <span onClick={() => {
                            this._onMouseZoomReduce(20)
                        }} className="app-button iconfont icon-reduce"/>
                        <span onClick={() => {
                            this._onRestoration()
                        }} className="app-button iconfont icon-restoration"/>
                        <span onClick={() => {
                            this._onRotating(-90)
                        }} className="app-button iconfont icon-rotate-left"/>
                        <span onClick={() => {
                            this._onRotating(+90)
                        }} className="app-button iconfont icon-rotate-right"/>
                    </div>
                </div>
            </>
        )
    }


    public render() {
        const {load} = this.state
        const classname = classNames({
            'app-handle-img': load === 'default',
            'app-handle-img-error': load === 'error'
        })
        return (
            <div id="app-handle-img" className={classname} onMouseOut={(e) => {
                this._onMouseMovingUp(e)
            }}>
                {
                    this.renderViewHandle()
                }
            </div>

        )
    }
}
