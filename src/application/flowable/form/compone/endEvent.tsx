import * as React from 'react';
import {ControlLabel, Form, FormControl, FormGroup} from 'rsuite';
import TaskListen from './taskListen';
import DiagramUtils from '../utils';

interface IProps {
    element: any
    modeling: any,
    bpmnFactory: any
    moddle: any
}

/**
 *
 * @author lk
 * @date 2020/6/19 13:42
 * @version 1.0
 */
export default class EndEvent extends React.Component<IProps> {

    private _onChange = (formValue: any, event: any) => {
        const {element, modeling, moddle, bpmnFactory} = this.props
        const businessObject = element?.businessObject ?? {}
        const {name, documentation, executionListener} = formValue
        const bpmnFactoryUtils = DiagramUtils.getBpmnFactory(bpmnFactory, moddle);
        bpmnFactoryUtils
            .setBase(businessObject, {
                name
            })
            .setFlowableExecutionListener(businessObject, executionListener)
            .setDocumentation(businessObject, {
                text: documentation
            })
        modeling?.updateProperties(element, {});
    }

    private _formValue = () => {
        const {element} = this.props
        const {id, name, documentation, extensionElements} = element?.businessObject ?? {}
        const etensionElements = DiagramUtils.getEtensionElements(extensionElements);
        return {
            id: id,
            name: name,
            documentation: documentation?.[0]?.text,
            executionListener: etensionElements.getExecutionListener()
        }
    }


    public render() {
        return (
            <Form fluid={true}
                  formValue={this._formValue()}
                  onChange={this._onChange}>
                <FormGroup>
                    <ControlLabel>id</ControlLabel>
                    <FormControl readOnly={true} disabled={true} name="id"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>名称</ControlLabel>
                    <FormControl autocomplete={'off'} name="name"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>备注</ControlLabel>
                    <FormControl autocomplete={'off'} componentClass="textarea" rows={3} name="documentation"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>执行监听器</ControlLabel>
                    <FormControl autocomplete={'off'}
                                 name="executionListener"
                                 data={[
                                     {
                                         value: 'start',
                                         label: '开始'
                                     },
                                     {
                                         value: 'end',
                                         label: '结束'
                                     },
                                     {
                                         value: 'take',
                                         label: '获取'
                                     }
                                 ]}
                                 accepter={TaskListen}/>
                </FormGroup>
            </Form>
        )
    }
}
