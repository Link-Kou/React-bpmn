import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Input, Modal, Schema} from 'rsuite';
import {utilsBoolean} from '@utils/index';

interface IProps {
    show?: boolean,

    onSave?(name: string, callbackCloseLoading: () => void): void

    onClose?(): void
}

/**
 * 新建产品分类
 * @author lk
 */
export default class TypeConfigAddModel extends React.Component<IProps> {

    private _Forms: any;

    private model = Schema.Model({
        name: Schema.Types.StringType()
            .maxLength(20, '名称长度不大于20个字')
            .minLength(2, '不能最小不能少于2个字')
            .isRequired('名称不能为空')
    });

    public state = {
        loading: false,
        formValue: {
            name: ''
        },
        formError: {}
    }

    private _reset = () => {
        this.setState({
            formValue: {
                name: ''
            },
            formError: {}
        })
    }

    private _onHide = () => {
        const {loading} = this.state;
        const {onClose} = this.props;
        if (!loading) {
            onClose?.()
        }
    }

    private _onSave = (name: string, check: boolean = false) => {
        const {onSave} = this.props
        if (utilsBoolean.toBoolean(check, false)) {
            this.setState({
                loading: true
            }, () => {
                const callbackCloseLoading = (): void => {
                    this.setState({
                        loading: false
                    })
                }
                onSave?.(name, callbackCloseLoading);
            })
        }
    }


    public render() {
        const {formValue, formError, loading} = this.state
        const {show} = this.props
        return (
            <Modal show={show}
                   size={'xs'}
                   backdrop={'static'}
                   onShow={this._reset}
                   onHide={this._onHide}>
                <Modal.Header>
                    <Modal.Title>新建分类</Modal.Title>
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
                            <ControlLabel>分类名称</ControlLabel>
                            <FormControl name="name" accepter={Input} autocomplete={'off'}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" loading={loading}
                            onClick={() => this._onSave(formValue.name, this._Forms?.check())}>
                        保存
                    </Button>
                    <Button appearance="subtle" disabled={loading} onClick={this._onHide}>
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
