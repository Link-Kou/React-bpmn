type ElementTypes =
    'bpmn:ServiceTask' |
    'bpmn:StartEvent' |
    'bpmn:DataObject'


type FlowableType =
    'http'


export class BpmnFactory {

    private _bpmnFactory: any

    private _moddle: any

    constructor(bpmnFactory: any, moddle: any) {
        this._bpmnFactory = bpmnFactory;
        this._moddle = moddle;
    }

    public setBase(businessObject: any, properties: { id?: string, name?: string, isExecutable?: boolean | Array<any> }): BpmnFactory {
        const {id, name, isExecutable} = properties
        if (id) {
            businessObject.id = id;
        }
        if (name) {
            businessObject.name = name;
        }
        if (isExecutable) {
            if (Array.isArray(isExecutable)) {
                if (isExecutable.length > 0) {
                    businessObject.isExecutable = true;
                } else {
                    businessObject.isExecutable = false;
                }
            } else {
                businessObject.isExecutable = isExecutable;
            }
        }
        return this;
    }

    /**
     * 设置描述文档
     * @param businessObject
     * @param properties
     */
    public setDocumentation(businessObject: any, properties: { text?: string | number | boolean }): BpmnFactory {
        const {documentation} = businessObject
        if (properties?.text) {
            if (Array.isArray(documentation) && documentation) {
                const documentationElement = businessObject.documentation[0];
                const newdocumentationElement = Object.assign(documentationElement, properties)
                businessObject.documentation = [newdocumentationElement]
            } else {
                const newVar = this._bpmnFactory.create('bpmn:Documentation', properties);
                businessObject.documentation = [newVar]
            }
        }
        return this;
    }

    /**
     * 自定义扩展
     * @param businessObject
     * @param type
     * @param url
     * @param properties
     */
    public setExtensionElements(businessObject: any, type: string, url: string, properties: any): BpmnFactory {
        const {extensionElements} = businessObject
        if (extensionElements) {
            const values: Array<any> = extensionElements.get('values');
            let find = false;
            const newVar = values.map((k, i, a) => {
                if (k?.$instanceOf(type)) {
                    find = true;
                    return Object.assign(k, properties)
                }
            });
            if (find) {
                businessObject.extensionElements.values = newVar
                return this;
            }
        }
        const analysis = this._moddle.createAny(type, url, properties);
        const extensionElement = this._bpmnFactory.create('bpmn:ExtensionElements', {})
        businessObject.extensionElements = extensionElement
        extensionElement.get('values').push(analysis);
        return this;
    }

    /**
     * 设置 flowable:historyLevel 标签
     * 为此流程定义设置特定的历史级别
     * @param businessObject
     * @param properties
     */
    public setFlowableHistoryLevel(businessObject: any, properties: { body?: string | number | boolean }): BpmnFactory {
        const {extensionElements} = businessObject
        if (properties?.body) {
            return this.setExtensionElements(businessObject, 'flowable:historyLevel', 'http://flowable.org/bpmn', {
                'xmlns:flowable': 'http://flowable.org/bpmn',
                '$body': properties.body
            })
        }
        const values: Array<any> = extensionElements.get('values')
        const newVar = values.filter((k, i, a) => !k?.$instanceOf('flowable:historyLevel'));
        businessObject.extensionElements.values = newVar
        return this;
    }

    /**
     * 设置 dataObject 标签
     * 作用于Flowable
     * @param businessObject
     * @param properties
     */
    public setFlowableDataObject(businessObject: any, properties: { dataObject: Array<any> }): BpmnFactory {
        const {flowElements} = businessObject
        const {dataObject} = properties
        if (Array.isArray(flowElements)) {
            const filter = flowElements.filter((k, i, a) => k.$type !== 'bpmn:DataObject');
            if (Array.isArray(dataObject)) {
                dataObject.forEach((k, i, a) => {
                    const newdataObject: any = this._bpmnFactory.create('bpmn:DataObject', {
                        id: k?.id,
                        name: k?.name
                    })
                    newdataObject.$attrs['flowable:itemSubjectRef'] = k?.type
                    const extensionElements = this._bpmnFactory.create('bpmn:ExtensionElements', {});
                    const flowablevalue = this._moddle.createAny('flowable:value', 'http://flowable.org/bpmn', {
                        $body: k?.value
                    });
                    extensionElements.values = [flowablevalue]
                    newdataObject.extensionElements = extensionElements
                    filter.push(newdataObject)
                });
            }
            businessObject.flowElements = filter
        }
        return this;
    }

    private _createExtensionElementsListener(businessObject: any, types: string, properties: Array<{ id?: string, event: string, achieve: string, value: string }>): BpmnFactory {
        const {extensionElements} = businessObject
        const createExecutionListener = (filter: Array<any>) => {
            if (Array.isArray(properties) && Array.isArray(filter)) {
                properties.forEach((k, i, a) => {
                    const props = {
                        event: k.event,
                        id: k.id
                    }
                    if (k.achieve === 'class') {
                        props['class'] = k.value
                    }
                    if (k.achieve === 'expression') {
                        props['expression'] = k.value
                    }
                    if (k.achieve === 'delegateExpression') {
                        props['delegateExpression'] = k.value
                    }
                    filter?.push(this._moddle.createAny(types, 'http://flowable.org/bpmn', props))
                })
            }
        }
        if (extensionElements) {
            const values: Array<any> = extensionElements?.values;
            const filter = values?.filter((k, i, a) => !k?.$instanceOf(types));
            createExecutionListener(filter)
            businessObject.extensionElements.values = filter
        } else {
            const filter: Array<any> = []
            createExecutionListener(filter)
            const extensionElement: any = this._bpmnFactory.create('bpmn:ExtensionElements', {
                values: filter
            });
            businessObject.extensionElements = extensionElement;
        }
        return this;
    }

    /**
     * flowable:executionListener
     * @param businessObject
     * @param properties
     */
    public setFlowableExecutionListener(businessObject: any, properties: Array<{ id?: string, event: string, achieve: string, value: string }>): BpmnFactory {
        return this._createExtensionElementsListener(businessObject, 'flowable:executionListener', properties)
    }

    /**
     * flowable:taskListener
     * @param businessObject
     * @param properties
     */
    public setFlowableTaskListener(businessObject: any, properties: Array<{ id?: string, event: string, achieve: string, value: string }>): BpmnFactory {
        return this._createExtensionElementsListener(businessObject, 'flowable:taskListener', properties)
    }

    /**
     * 流表达式
     * @param businessObject
     * @param properties
     */
    public setConditionExpression(businessObject: any, properties: { body: Array<any> }): BpmnFactory {
        const {conditionExpression} = businessObject
        const {body} = properties
        if (conditionExpression) {
            conditionExpression.body = body
        } else {
            const formalExpression = this._bpmnFactory.create('bpmn:FormalExpression', {
                body,
                'xsi:type': 'bpmn:tFormalExpression'
            })
            businessObject.conditionExpression = formalExpression
        }
        return this;
    }

    /**
     * 自定义属性
     * @param businessObject
     * @param type
     * @param url
     * @param properties
     */
    public setAttrs(businessObject: any, properties: { [x: string]: any }): BpmnFactory {
        if (properties) {
            Object.keys(properties).forEach((k, i, a) => {
                if (properties[k]) {
                    businessObject.$attrs[k] = properties[k]
                } else {
                    delete businessObject.$attrs[k];
                }
            })
        }
        return this;
    }
}


export class BpmnFlowElements {

    private _flowElements: Array<any>

    constructor(flowElements: Array<any>) {
        this._flowElements = flowElements;
    }

    public getDataObject(): Array<{ id: string, name: string, type: any, value: any }> {
        const _moddleElement: Array<any> = this._flowElements?.filter((k, i, a) => {
            return k?.$type === 'bpmn:DataObject'
        });
        const moddleElement: any = _moddleElement
        const data: Array<any> = []
        const getFlowableValue = (extensionElements: any) => {
            const values: Array<any> = extensionElements?.values;
            const filter = values.filter((k, i, a) => {
                return k?.$type === 'flowable:value'
            });
            return filter?.[0]?.$body
        }
        if (moddleElement && Array.isArray(moddleElement)) {
            moddleElement.forEach((k, i, a) => {
                data.push({
                    id: k.id,
                    name: k.name,
                    type: k?.$attrs?.['flowable:itemSubjectRef'],
                    value: getFlowableValue(k?.extensionElements)
                })
            })
        }
        return data;
    }

}

export class BpmneEtensionElements {

    private _extensionElements: any

    constructor(extensionElements: any) {
        this._extensionElements = extensionElements ?? {};
    }

    public getTaskListener(): Array<{ event: string, achieve: string, value: string }> {
        const values: Array<any> = this._extensionElements.values;
        const taskListener = values?.filter((k, i, a) => {
            return k?.$instanceOf('flowable:taskListener')
        });
        if (Array.isArray(taskListener) && taskListener.length > 0) {
            return taskListener.map((k, i, a) => {
                let value = ''
                let achieve = ''
                let id = Date.now().toString(36) + i
                if (k['class']) {
                    value = k['class']
                    achieve = 'class'
                }
                if (k['expression']) {
                    value = k['expression']
                    achieve = 'expression'
                }
                if (k['delegateExpression']) {
                    value = k['delegateExpression']
                    achieve = 'delegateExpression'
                }
                if (k['id']) {
                    id = k['id']
                }
                return {
                    id,
                    event: k.event,
                    achieve,
                    value
                }
            })
        }
        return []
    }

    public getExecutionListener(): Array<{ event: string, achieve: string, value: string }> {
        const values: Array<any> = this._extensionElements.values;
        const taskListener = values?.filter((k, i, a) => {
            return k?.$instanceOf('flowable:executionListener')
        });
        if (Array.isArray(taskListener) && taskListener.length > 0) {
            return taskListener.map((k, i, a) => {
                let value = ''
                let achieve = ''
                let id = Date.now().toString(36) + i
                if (k['class']) {
                    value = k['class']
                    achieve = 'class'
                }
                if (k['expression']) {
                    value = k['expression']
                    achieve = 'expression'
                }
                if (k['delegateExpression']) {
                    value = k['delegateExpression']
                    achieve = 'delegateExpression'
                }
                if (k['id']) {
                    id = k['id']
                }
                return {
                    id,
                    event: k.event,
                    achieve,
                    value
                }
            })
        }
        return []
    }
}


export default class DiagramUtils {


    public static getBusinessObject(element: any): any {
        return element?.businessObject ?? {}
    }

    public static getBpmnFactory(bpmnFactory: any, moddle: any): BpmnFactory {
        return new BpmnFactory(bpmnFactory, moddle);
    }


    public static getFlowElements(flowElements: Array<any>): BpmnFlowElements {
        return new BpmnFlowElements(flowElements);
    }

    public static getEtensionElements(extensionElements: any): BpmneEtensionElements {
        return new BpmneEtensionElements(extensionElements);
    }

    public static getFormalExpression(conditionExpression: any) {
        const {body, $attrs} = conditionExpression ?? {}
        return {
            body,
            type: $attrs?.['xsi:type']
        }
    }

    public static isType(element: any, types: ElementTypes): boolean {
        const type = element?.type
        return type === types
    }

    public static isFlowableType(element: any, types: FlowableType): boolean {
        const type = element?.businessObject?.['$attrs']?.['flowable:type']
        return type === types
    }

    public static getInfo(element: any) {

    }
}



