import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Input, Modal, Schema} from 'rsuite';
import {utilsBoolean} from '@utils/index';

interface IProps {
    show?: boolean

    key?: string

    value?: string

    onSave?(name: string, callbackCloseLoading: () => void): void

    onClose?(): void
}

/**
 * 新建产品分类
 * @author lk
 */
export default class RoleManageAddEditModel extends React.Component<IProps> {

    private _Forms: any;

    private model = Schema.Model({
        name: Schema.Types.StringType()
            .maxLength(20, '名称长度不大于20个字')
            .minLength(2, '不能最小不能少于2个字')
            .isRequired('名称不能为空')
    });

    public state = {
        buttonloading: false,
        formValue: {
            name: ''
        },
        formError: {}
    }

    private _reset = () => {
        const {value} = this.props
        this.setState({
            formValue: {
                name: value ?? ''
            },
            formError: {}
        })
    }

    private _onHide = () => {
        const {buttonloading} = this.state;
        const {onClose} = this.props;
        if (!buttonloading) {
            onClose?.()
        }
    }

    private _onSave = (name: string, check: boolean = false) => {
        const {onSave} = this.props
        if (utilsBoolean.toBooleanGetDefault(check, false)) {
            this.setState({
                buttonloading: true
            }, () => {
                const callbackCloseLoading = (): void => {
                    this.setState({
                        buttonloading: false
                    })
                }
                onSave?.(name, callbackCloseLoading);
            })
        }
    }


    public render() {
        const {formValue, formError, buttonloading} = this.state
        const {show} = this.props
        return (
            <Modal show={show}
                   size={'xs'}
                   backdrop={'static'}
                   onShow={this._reset}
                   onHide={this._onHide}>
                <Modal.Header>
                    <Modal.Title>角色管理</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        ref={(ref: any) => this._Forms = ref}
                        fluid={true}
                        model={this.model}
                        formError={formError}
                        formDefaultValue={{}}
                        formValue={formValue}
                        onChange={(e) => {
                            this.setState({formValue: e});
                        }}
                        onCheck={e => {
                            this.setState({formError: e});
                        }}
                    >
                        <FormGroup>
                            <ControlLabel>角色名称</ControlLabel>
                            <FormControl name="name" accepter={Input} autocomplete={'off'}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" loading={buttonloading}
                            onClick={() => this._onSave(formValue.name, this._Forms?.check())}>
                        保存
                    </Button>
                    <Button appearance="subtle" onClick={this._onHide}>
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}