import * as React from 'react';
import {Checkbox, CheckboxGroup, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row} from 'rsuite';
import Required from './required';
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
export default class StartEvent extends React.Component<IProps> {

    private _onChange = (formValue: any, event: any) => {
        const {element, modeling, moddle, bpmnFactory} = this.props
        const businessObject = element?.businessObject ?? {}
        const {name, formFieldValidation, documentation, initiator, executionListener} = formValue
        const bpmnFactoryUtils = DiagramUtils.getBpmnFactory(bpmnFactory, moddle);
        bpmnFactoryUtils
            .setBase(businessObject, {
                name
            })
            .setAttrs(businessObject, {
                'flowable:formFieldValidation': (formFieldValidation as Array<any>)?.length > 0,
                'flowable:initiator': initiator
            })
            .setFlowableExecutionListener(businessObject, executionListener)
            .setDocumentation(businessObject, {
                text: documentation
            })
        modeling?.updateProperties(element, {
            name
        });
    }

    private _formValue = () => {
        const {element} = this.props
        const {id, name, $attrs, documentation, extensionElements} = element?.businessObject ?? {}
        const etensionElements = DiagramUtils.getEtensionElements(extensionElements);
        return {
            id: id,
            name: name,
            formFieldValidation: $attrs?.['flowable:formFieldValidation'] ? ['formFieldValidation'] : [],
            documentation: documentation?.[0]?.text,
            initiator: $attrs?.['flowable:initiator'],
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
                <Grid fluid={true}>
                    <Row>
                        <Col xs={8}>
                            <FormGroup>
                                <ControlLabel><Required/>验证表单字段</ControlLabel>
                                <FormControl autocomplete={'off'} name="formFieldValidation" accepter={CheckboxGroup}>
                                    <Checkbox value="formFieldValidation"/>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>
                <FormGroup>
                    <ControlLabel>名称</ControlLabel>
                    <FormControl autocomplete={'off'} name="name"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>备注</ControlLabel>
                    <FormControl autocomplete={'off'} componentClass="textarea" rows={3} name="documentation"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>分配用户</ControlLabel>
                    <FormControl autocomplete={'off'} name="initiator"/>
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
