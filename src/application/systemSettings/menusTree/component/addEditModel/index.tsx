import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Input, Modal, Schema, InputPicker} from 'rsuite';
import {utilsBoolean} from '@utils/index';
import {LoadPanel} from '@component/panel';

interface IProps {
    show?: boolean

    title?: string

    id?: string

    onSave?(formValue: { name: string, type: string, keyid: string }, callbackCloseLoading: () => void, id?: string): void

    onClose?(): void

    onLoad(callback: (data: {
        name: string
        type: string
        keyid: string
    }) => void, id?: string): void
}

/**
 * 新建产品分类
 * @author lk
 */
export default class MenusTreeAddEditModel extends React.Component<IProps> {

    private _Forms: any;

    private model = Schema.Model({
        name: Schema.Types.StringType()
            .maxLength(20, '名称长度不大于20个字')
            .minLength(2, '不能最小不能少于2个字')
            .isRequired('名称不能为空')
    });

    public state = {
        buttonloading: true,
        loading: true,
        formValue: {
            name: '',
            type: '',
            keyid: ''
        },
        formError: {}
    }

    private _reset = () => {
        const {onLoad, id} = this.props
        this.setState({
            formValue: {},
            formError: {},
            buttonloading: true,
            loading: true
        }, () => {
            onLoad((data) => {
                this.setState({
                    loading: false,
                    buttonloading: false,
                    formValue: data
                })
            }, id);
        })
    }

    private _onHide = () => {
        const {loading} = this.state;
        const {onClose} = this.props;
        if (!loading) {
            onClose?.()
        }
    }

    private _onSave = (check: boolean = false) => {
        const {onSave, id} = this.props
        const {formValue} = this.state
        if (utilsBoolean.toBooleanGetDefault(check, false)) {
            this.setState({
                buttonloading: true
            }, () => {
                const callbackCloseLoading = (): void => {
                    this._onHide()
                }
                onSave?.({
                    name: formValue.name,
                    type: formValue.type,
                    keyid: formValue.keyid
                }, callbackCloseLoading, id);
            })
        }
    }


    public render() {
        const {formValue, formError, loading, buttonloading} = this.state
        const {show, title} = this.props
        return (
            <Modal show={show}
                   size={'xs'}
                   backdrop={'static'}
                   onShow={this._reset}
                   onHide={this._onHide}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoadPanel height={250} loadering={loading} outrender={true} queueAnim={false}>
                        <Form
                            ref={(ref: any) => this._Forms = ref}
                            fluid={true}
                            model={this.model}
                            formError={formError}
                            formValue={formValue}
                            onChange={(e) => {
                                this.setState({formValue: e});
                            }}
                            onCheck={e => {
                                this.setState({formError: e});
                            }}
                        >
                            <FormGroup>
                                <ControlLabel>菜单名称</ControlLabel>
                                <FormControl name="name" accepter={Input} autocomplete={'off'}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>菜单类型</ControlLabel>
                                <FormControl name="type"
                                             style={{width: '100%'}}
                                             accepter={InputPicker}
                                             autocomplete={'off'}
                                             data={[
                                                 {
                                                     value: 2,
                                                     label: '菜单'
                                                 },
                                                 {
                                                     value: 1,
                                                     label: '菜单组'
                                                 }
                                             ]}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Key</ControlLabel>
                                <FormControl name="keyid" accepter={Input} autocomplete={'off'}/>
                            </FormGroup>
                        </Form>
                    </LoadPanel>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" loading={buttonloading}
                            onClick={() => this._onSave(this._Forms?.check())}>
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
