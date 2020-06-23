import * as React from 'react';
import ReactDOM from 'react-dom';
import SaveControls from './saveControls';


export class ToolbarSaveControls {

    private element: any;

    private saveControls: any;

    constructor(config: any, elementRegistry: any) {
        const {container} = config
        const element = this.element = document.createElement('div');
        element.setAttribute('class', 'app-react-bpmn-SaveControls')
        container.appendChild(element);
        ReactDOM.render(<SaveControls ref={(ref: any) => this.saveControls = ref} elementRegistry={elementRegistry}/>, element)
    }

    public getPanle() {
        return this.element
    }

    public setViewer(viewer: any) {
        this.saveControls?.setViewer(viewer)
    }
}

(ToolbarSaveControls as any).$inject = [
    'config',
    'elementRegistry'
];

export default {
    __init__: ['toolbarSaveControls'],
    toolbarSaveControls: ['type', ToolbarSaveControls]
};
