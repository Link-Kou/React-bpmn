import * as React from 'react';
import ReactDOM from 'react-dom';
import InfoForm from './infoForm';

/**
 *
 * @author lk
 * @date 2020/6/18 08:29
 * @version 1.0
 */
export class ToolbarInfoForm {

    private canvas: any;

    private translate: any;

    private reactDOM: any;

    constructor(config: any, canvas: any, translate: any, toolbarZoomControls: any, minimap: any) {
        const {container} = config
        this.canvas = canvas;
        this.translate = translate;
        const element = document.createElement('div');
        element.setAttribute('class', 'app-react-bpmn-InfoForm')
        container.appendChild(element);
        // eslint-disable-next-line react/no-render-return-value
        ReactDOM.render(<InfoForm ref={(ref) => this.reactDOM = ref} canvas={this.canvas}
                                  translate={this.translate}
                                  minimap={minimap}
                                  toolbarZoomControls={toolbarZoomControls}/>, element);
    }


    public getReactDOM() {
        return this.reactDOM
    }
}

(ToolbarInfoForm as any).$inject = [
    'config',
    'canvas',
    'translate',
    'toolbarZoomControls',
    'minimap'
];

export default {
    __init__: ['toolbarInfoForm'],
    toolbarInfoForm: ['type', ToolbarInfoForm]
};
