import * as React from 'react';
// @ts-ignore
import BpmnModelers from 'bpmn-js/dist/bpmn-modeler.production.min.js';
//import BpmnModelers from 'bpmn-js/dist/bpmn-modeler.development.js';
// @ts-ignore
//import DiagramOriginModule from 'diagram-js-origin';
import minimapModule from './minimap'

import './index.scss'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

//import {CustomDescriptor} from './extensions'


export class BpmnModeler {

    public bpmnViewer: any = React.createRef();

    constructor(props: { container: any, additionalModules: Array<any> } | any, config: any) {
        const {container, additionalModules} = props
        this.bpmnViewer = new BpmnModelers({
            container,
            additionalModules: [minimapModule, ...additionalModules],
            ...config
            /*,
            moddleExtensions: {
                customDescriptor: CustomDescriptor
            }*/
        });
    }

    public importXML(text: any, error: (error: any) => void): void {
        this.bpmnViewer.importXML(text, error)
        const toolbarSaveControls = this.bpmnViewer.get('toolbarSaveControls');
        toolbarSaveControls?.setViewer(this.bpmnViewer)
    }

    public on(eventName: any, event: (event: any) => void) {

    }

    public get(key: any): any {
        return this.bpmnViewer?.get(key)
    }

    public destroy(): void {
        this.bpmnViewer?.destroy()
    }


    public getCanvas(): void {

    }
}
