import * as React from 'react';
import {Checkbox, CheckboxGroup, ControlLabel, Form, FormControl, FormGroup, InputPicker} from 'rsuite';
import DiagramUtils from '../utils';
import DataObject from './dataObject'
import Required from './required'

interface IProps {
    element: any
    modeling: any,
    bpmnFactory: any
    moddle: any
}

/**
 *
 * @author lk
 * @date 2020/6/19 16:03
 * @version 1.0
 */
export default class Process extends React.Component<IProps> {

    private _onChange = (formValue: any, event: any) => {
        const {element, modeling, moddle, bpmnFactory} = this.props
        const businessObject = element?.businessObject ?? {}
        const {name, version, author, documentation, historyLevel, isExecutable, dataObject} = formValue
        const bpmnFactoryUtils = DiagramUtils.getBpmnFactory(bpmnFactory, moddle);
        bpmnFactoryUtils
            .setBase(businessObject, {
                name,
                isExecutable
            })
            .setAttrs(businessObject, {
                version,
                author
            })
            .setFlowableHistoryLevel(businessObject, {
                body: historyLevel
            })
            .setDocumentation(businessObject, {
                text: documentation
            })
            .setFlowableDataObject(businessObject, {
                dataObject: dataObject
            })
        modeling?.updateProperties(element, {
            name
        });
    }

    private _formValue = () => {
        const {element} = this.props
        const {id, name, $attrs, documentation, isExecutable, flowElements} = element?.businessObject ?? {}
        //ElementHandler.prototype.createElement
        const dataObject = DiagramUtils.getFlowElements(flowElements).getDataObject();
        return {
            id: id,
            name: name,
            version: $attrs?.version,
            isExecutable: isExecutable ? ['isExecutable'] : [],
            documentation: documentation?.[0]?.text,
            dataObject: dataObject
        }
    }

    public render() {
        return (
            <Form fluid={true}
                  formValue={this._formValue()}
                  onChange={this._onChange}
            >
                <FormGroup>
                    <ControlLabel><Required/>id</ControlLabel>
                    <FormControl readOnly={true} disabled={true} autocomplete={'off'} name="id"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel><Required/>是否可执行</ControlLabel>
                    <FormControl autocomplete={'off'} name="isExecutable" accepter={CheckboxGroup}>
                        <Checkbox value="isExecutable"/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel><Required/>名称</ControlLabel>
                    <FormControl autocomplete={'off'} name="name"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>流程版本</ControlLabel>
                    <FormControl autocomplete={'off'} name="version"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>作者</ControlLabel>
                    <FormControl autocomplete={'off'} name="author"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>备注</ControlLabel>
                    <FormControl autocomplete={'off'} componentClass="textarea" rows={3} name="documentation"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>为此流程定义设置特定的历史级别</ControlLabel>
                    <FormControl style={{width: '100%'}} autocomplete={'off'} name="historyLevel"
                                 placeholder={'历史级别'}
                                 accepter={InputPicker}
                                 data={[
                                     {
                                         label: 'none',
                                         value: '无'
                                     },
                                     {
                                         label: '活动',
                                         value: 'activity'
                                     },
                                     {
                                         label: '审计',
                                         value: 'audit'
                                     },
                                     {
                                         label: '完成',
                                         value: 'full'
                                     }
                                 ]}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>数据对象</ControlLabel>
                    <FormControl name="dataObject" accepter={DataObject}/>
                </FormGroup>
            </Form>
        )
    }

}
