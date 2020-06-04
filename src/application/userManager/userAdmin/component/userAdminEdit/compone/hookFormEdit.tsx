import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Row, TagPicker} from 'rsuite';
import {IAdmin} from '../../../index.types';
import TagPickerList from '@component/tagPickerList';

interface IProps {
    roles?: Array<any>

    edit?: boolean

    formValue?: IAdmin

    onChange?(formValue: any): void
}

/**
 *
 * @author lk
 * @date 2020/5/27 23:50
 * @version 1.0
 */
export default class HookFormEdit extends React.Component<IProps> {

    private _onFormValueChange = (formValue: any) => {
        const {onChange} = this.props
        onChange?.(formValue)
    }

    public render() {
        const {roles, formValue, edit} = this.props
        return (
            <Form fluid={true}
                  readOnly={edit}
                  formValue={formValue}
                  onChange={this._onFormValueChange}>
                <Row style={{marginBottom: 20}}>
                    <Col md={8} sm={8} lg={8} xs={8}>
                        <FormGroup>
                            <ControlLabel>用户名</ControlLabel>
                            <FormControl disabled={edit} name="name" autocomplete="off"/>
                        </FormGroup>
                    </Col>
                    <Col md={8} sm={8} lg={8} xs={8}>
                        <FormGroup>
                            <ControlLabel>手机号码</ControlLabel>
                            <FormControl disabled={edit} name="phone" autocomplete="off"/>
                        </FormGroup>
                    </Col>
                    <Col md={8} sm={8} lg={8} xs={8}>
                        <FormGroup>
                            <ControlLabel>电子邮箱</ControlLabel>
                            <FormControl disabled={edit} name="email" autocomplete="off"/>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <ControlLabel>备注标签</ControlLabel>
                    <FormControl name="remarks" autocomplete="off" creatable={!edit} accepter={TagPickerList}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>关联角色</ControlLabel>
                    <FormControl name="roles"
                                 disabled={edit}
                                 style={{width: '100%'}}
                                 accepter={TagPicker}
                                 data={roles as any}/>
                </FormGroup>
            </Form>
        )
    }
}
