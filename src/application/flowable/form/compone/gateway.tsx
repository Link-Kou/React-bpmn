import * as React from 'react';
import {ControlLabel, Form, FormControl, FormGroup} from 'rsuite';
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
export default class Gateway extends React.Component<IProps> {

    private _onChange = (formValue: any, event: any) => {
        const {element, modeling, moddle, bpmnFactory} = this.props
        const businessObject = element?.businessObject ?? {}
        const {name, documentation} = formValue
        const bpmnFactoryUtils = DiagramUtils.getBpmnFactory(bpmnFactory, moddle);
        bpmnFactoryUtils
            .setBase(businessObject, {
                name
            })
            .setDocumentation(businessObject, {
                text: documentation
            })
        modeling?.updateProperties(element, {
            name
        });
    }

    private _formValue = () => {
        const {element} = this.props
        const {id, name, documentation} = element?.businessObject ?? {}
        return {
            id: id,
            name: name,
            documentation: documentation?.[0]?.text
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
            </Form>
        )
    }
}
