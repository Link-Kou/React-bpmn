import * as React from 'react';
import {Alert} from 'rsuite';
import {BpmnModeler} from './bpmn';
import modulesTranslate from './bpmn/i18n';
import ToolbarZoomControls from './bpmn/toolbar/zoomControls';
import ToolbarOriginLine from './bpmn/toolbar/originLine';
import ToolbarOriginAlign from './bpmn/toolbar/originAlign';
import ToolbarInfoForm from './bpmn/toolbar/infoForm';
import ToolbarSaveControls from './bpmn/toolbar/saveControls';
import ElementInfoForm from './form';


/**
 *
 * @author lk
 * @date 2020/6/17 18:32
 * @version 1.0
 */
export default class index extends React.Component {

    public containerRef: any = React.createRef();

    public bpmnViewer: BpmnModeler = React.createRef() as unknown as BpmnModeler

    public diagram: string = require('../../resource/bpmn/请假流程.bpmn20.xml')

    public state = {}

    public componentDidMount() {
        const container = this.containerRef.current;
        this.bpmnViewer = new BpmnModeler({
            container,
            additionalModules: [modulesTranslate, ToolbarZoomControls, ToolbarOriginLine, ToolbarOriginAlign, ToolbarInfoForm, ElementInfoForm, ToolbarSaveControls]
        }, {
            toolbar: {
                containers: container
            }
        });

        this.bpmnViewer.on('import.done', (event: any) => {
            const {
                error,
                warnings
            } = event;
            if (error) {
                //错误
                Alert.error(error)
            }
            //缩放视图
            this.bpmnViewer.get('canvas')
                .zoom('fit-viewport');
            if (warnings) {
                Alert.warning(warnings)
            }
        });
        fetch(this.diagram)
            .then(response => response.text())
            .then(text => {
                this.bpmnViewer.importXML(text, (err: any) => {
                    console.error(err);
                });
            })
            .catch(err => {
            });
    }

    public componentWillUnmount() {
        this.bpmnViewer?.destroy();
    }

    public render() {
        return (
            <>
                <div className="react-bpmn-diagram-container"
                     ref={this.containerRef}/>
            </>
        )
    }


}
