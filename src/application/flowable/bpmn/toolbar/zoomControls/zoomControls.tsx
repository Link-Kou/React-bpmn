import * as React from 'react';
import './index.scss'
import {Icon} from 'rsuite';
import classNames from 'classnames';

export const {default: dw} = require('./svg/01.svg');
export const {default: sx} = require('./svg/02.svg');
export const {default: fd} = require('./svg/03.svg');
export const {default: fzx} = require('./svg/04.svg');
export const {default: dt} = require('./svg/05.svg');
export const {default: sp} = require('./svg/06.svg');

interface IProps {
    zoomScroll: any
    canvas: any;
    toolbarOriginLine: any;
    toolbarOriginAlign: any;
    minimap: any;
    translate: any;
}

/**
 *
 * @author lk
 * @date 2020/6/18 10:21
 * @version 1.0
 */
export default class ZoomControls extends React.Component<IProps> {

    public state = {
        showBorder: true,
        showAlign: false,
        showMap: false
    }

    componentDidMount() {
        this._onOrigin()
    }

    private _onOrigin() {
        const {canvas} = this.props
        const viewbox = canvas.viewbox();
        canvas.viewbox({
            x: viewbox.x - (viewbox.width / 10),
            y: viewbox.y - (viewbox.height / 9),
            width: viewbox.width,
            height: viewbox.height
        });
    }

    public render() {
        const {zoomScroll, toolbarOriginLine, toolbarOriginAlign, minimap} = this.props
        const {showBorder, showAlign, showMap} = this.state
        return (
            <>
                <ul>
                    <li onClick={() => {
                        zoomScroll.reset();
                        this._onOrigin()
                    }}>
                        <Icon size={'lg'} icon={dw}/>
                    </li>
                    <li onClick={() => {
                        toolbarOriginLine?.toggle();
                        this.setState({
                            showBorder: toolbarOriginLine?.showBorder
                        })
                    }}>
                        <Icon size={'2x'}
                              className={classNames({
                                  'select': showBorder
                              })}
                              icon={fzx}/>
                    </li>
                    <li onClick={() => {
                        toolbarOriginAlign?.toggle();
                        this.setState({
                            showAlign: toolbarOriginAlign?.showAlign
                        })
                    }}>
                        <Icon size={'lg'}
                              className={classNames({
                                  'select': showAlign
                              })}
                              icon={sp}/>
                    </li>
                    <li onClick={() => {
                        minimap?.toggle();
                        this.setState({
                            showMap: minimap?.isOpen()
                        })
                    }}>
                        <Icon size={'lg'}
                              className={classNames({
                                  'select': showMap
                              })}
                              icon={dt}/>
                    </li>
                    <li onClick={() => {
                        zoomScroll.stepZoom(+1);
                    }}>
                        <Icon size={'lg'} icon={fd}/>
                    </li>
                    <li onClick={() => {
                        zoomScroll.stepZoom(-1);
                    }}>
                        <Icon size={'lg'} icon={sx}/>
                    </li>
                </ul>
            </>
        );
    }
}
