import * as React from 'react';
import {ControlLabel, Form, FormControl, FormGroup, TagPicker} from 'rsuite';
import TagPickerList from '@component/tagPickerList';

interface IProps {
    roles?: Array<any>

    onChange?(formValue: any): void
}

/**
 *
 * @author lk
 * @date 2020/5/27 23:50
 * @version 1.0
 */
export default class HookFormEdit extends React.Component<IProps> {

    public state = {
        formValue: {
            roles: []
        }
    }

    private _onFormValueChange = (formValue: any) => {
        const {onChange} = this.props
        this.setState({
            formValue
        }, () => {
            onChange?.(formValue)
        })
    }

    public render() {
        const {roles} = this.props
        const {formValue} = this.state
        return (
            <Form fluid={true}
                  formValue={formValue}
                  onChange={this._onFormValueChange}>
                <FormGroup>
                    <ControlLabel>用户名</ControlLabel>
                    <FormControl name="name" autocomplete="off"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>手机号码</ControlLabel>
                    <FormControl name="phone" autocomplete="off"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>电子邮箱</ControlLabel>
                    <FormControl name="email" autocomplete="off"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>备注标签</ControlLabel>
                    <FormControl name="remarks" autocomplete="off" accepter={TagPickerList}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>关联角色</ControlLabel>
                    <FormControl name="roles"
                                 style={{width: '100%'}}
                                 accepter={TagPicker}
                                 data={roles as any}/>
                </FormGroup>
            </Form>
        )
    }
}
