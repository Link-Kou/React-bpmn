import UserTask from './compone/userTask'
import Process from './compone/process'
import StartEvent from './compone/startEvent'
import EndEvent from './compone/endEvent'
import SequenceFlow from './compone/sequenceFlow'
import Gateway from './compone/gateway'
import './index.scss'

const ElementTypes = {
    'bpmn:UserTask': UserTask,
    'bpmn:Process': Process,
    'bpmn:StartEvent': StartEvent,
    'bpmn:EndEvent': EndEvent,
    'bpmn:SequenceFlow': SequenceFlow,
    'bpmn:ExclusiveGateway': Gateway,
    'bpmn:ParallelGateway': Gateway,
    'bpmn:InclusiveGateway': Gateway,
    'bpmn:EventBasedGateway': Gateway
}

/**
 *
 * @author lk
 * @date 2020/6/18 08:29
 * @version 1.0
 */
export class ElementInfoForm {

    private toolbarInfoForm: any

    private modeling: any

    private moddle: any

    private bpmnFactory: any

    constructor(config: any, canvas: any, translate: any, modeling: any, moddle: any, bpmnFactory: any, eventBus: any, toolbarInfoForm: any) {
        this.toolbarInfoForm = toolbarInfoForm;
        this.modeling = modeling;
        this.moddle = moddle;
        this.bpmnFactory = bpmnFactory;
        eventBus.on('element.click', this.handleClickElement.bind(this));
        eventBus.on('element.changed', this.handleClickElement.bind(this));
    }


    private handleClickElement(e: any) {
        const type = e.type
        const element = e?.element;
        const reactDOM = this.toolbarInfoForm?.getReactDOM();
        if (element) {
            const elementType = ElementTypes[element?.type];
            if (type === 'element.click') {
                reactDOM?.renderForm(element?.id, elementType, element, this.modeling, this.moddle, this.bpmnFactory);
            } else if (elementType) {
                reactDOM?.renderForm(element?.id, elementType, element, this.modeling, this.moddle, this.bpmnFactory);
            }
        }
    }

}

(ElementInfoForm as any).$inject = [
    'config',
    'canvas',
    'translate',
    'modeling',
    'moddle',
    'bpmnFactory',
    'eventBus',
    'toolbarInfoForm'
];

export default {
    __init__: ['elementInfoForm'],
    elementInfoForm: ['type', ElementInfoForm]
};
