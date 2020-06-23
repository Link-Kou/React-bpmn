import * as React from 'react';
import ReactDOM from 'react-dom';
import ZoomControls from './zoomControls';

/**
 *
 * @author lk
 * @date 2020/6/18 08:29
 * @version 1.0
 */
export class ToolbarZoomControls {

    private zoomScroll: any;
    private canvas: any;
    private translate: any;

    private element: any;

    constructor(config: any, zoomScroll: any, canvas: any, translate: any, toolbarOriginLine: any, toolbarOriginAlign: any, minimap: any) {
        const {container} = config
        this.zoomScroll = zoomScroll;
        this.canvas = canvas;
        this.translate = translate;
        const element = this.element = document.createElement('div');
        element.setAttribute('class', 'app-react-bpmn-ZoomControls')
        container.appendChild(element);
        ReactDOM.render(<ZoomControls canvas={this.canvas}
                                      toolbarOriginLine={toolbarOriginLine}
                                      toolbarOriginAlign={toolbarOriginAlign}
                                      minimap={minimap}
                                      translate={this.translate}
                                      zoomScroll={this.zoomScroll}/>, element)
    }


    public getPanle() {
        return this.element
    }
}

(ToolbarZoomControls as any).$inject = [
    'config',
    'zoomScroll',
    'canvas',
    'translate',
    'toolbarOriginLine',
    'toolbarOriginAlign',
    'minimap'
];

export default {
    __init__: ['toolbarZoomControls'],
    toolbarZoomControls: ['type', ToolbarZoomControls]
};
