import * as React from 'react';
import './index.scss'


interface IProps {
    maxWidth?: number
    minWidth?: number
    canvas: any;
    translate: any;
    toolbarZoomControls: any;
    minimap: any;
}


/**
 *
 * @author lk
 * @date 2020/6/19 08:14
 * @version 1.0
 */
export default class index extends React.Component<IProps> {

    private _clientWidth: number = 350

    public state = {
        id: '',
        component: undefined
    }

    private handleMouseDown = (event: any) => {
        const {maxWidth, minWidth} = this.props
        event.preventDefault()
        const {clientX, target} = event
        const width = target.parentNode.clientWidth
        document.body.onmousemove = (e: any) => {
            const newWidth = width + (clientX - e.clientX)
            const setWidth = (max: number = 850, min: number = 350) => {
                if (newWidth <= max && newWidth > min) {
                    target.parentNode.style.width = newWidth + 'px'
                    this.handleSizeChange(newWidth);
                }
            }
            setWidth(maxWidth, minWidth);
        }
        document.body.onmouseup = function () {
            document.body.onmousemove = null
        }
    }

    private handleToggle = (event: any) => {
        const {target} = event
        let parentNode = target.parentNode
        if (parentNode.getAttribute('class') === 'app-react-bpmn-InfoForm-toggle') {
            parentNode = target.parentNode.parentNode
        }
        if (this._clientWidth) {
            parentNode.style.width = this._clientWidth + 'px'
            this.handleSizeChange(this._clientWidth);
            this._clientWidth = 0;
        } else {
            this._clientWidth = parentNode.clientWidth
            parentNode.style.width = '0px'
            this.handleSizeChange(0);
        }
    }

    private handleSizeChange = (newWidth: number) => {
        const {toolbarZoomControls, minimap} = this.props
        const zoomPanle: any = toolbarZoomControls?.getPanle();
        const mapPanle: any = minimap?._parent;
        if (zoomPanle) {
            zoomPanle.style.right = newWidth + 10 + 'px'
        }
        if (mapPanle) {
            mapPanle.style.right = newWidth + 55 + 'px'
        }
    }

    public renderForm(id: string, Component: any, props: any, modeling: any, moddle: any, bpmnFactory: any) {
        this.setState({
            id,
            component: Component ?
                <Component key={id} element={props} modeling={modeling} moddle={moddle} bpmnFactory={bpmnFactory}/> : undefined
        })
    }

    public render() {
        const {component} = this.state
        return (
            <>
                <div className={'app-react-bpmn-InfoForm-drag'} onMouseDown={this.handleMouseDown}/>
                <div className={'app-react-bpmn-InfoForm-form'}>
                    <div className={'app-react-bpmn-InfoForm-title'}>
                        <h3>属性面板</h3>
                    </div>
                    <div className={'app-react-bpmn-InfoForm-body'}>
                        {component}
                    </div>
                </div>
                <div className={'app-react-bpmn-InfoForm-toggle'}
                     onClick={this.handleToggle}>
                    <span>属性面板</span>
                </div>
            </>
        )
    }
}
