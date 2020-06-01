import * as React from 'react';
import {Button, Col, Modal, Row} from 'rsuite';
import HookFormEdit from './compone/hookFormEdit';
import HookCheckTree from './compone/hookCheckTree';


interface IProps {
    show?: boolean

    title?: string

    key?: string

    onSave?(name: string, callbackCloseLoading: () => void, key?: string): void

    onClose?(): void

    onLoad?(): {}

    treeData?: Array<any>

    selectTreeData?: Array<any>

}

/**
 *
 * @author lk
 * @date 2020/5/26 16:37
 * @version 1.0
 */
export default class UserAdminEditModel extends React.Component<IProps> {

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

    public render() {
        const {loading} = this.state
        const {show, treeData, selectTreeData} = this.props
        return (
            <>
                <Modal show={show}
                       size={'sm'}
                       backdrop={'static'}
                       onShow={this._reset}
                       onHide={this._onHide}>
                    <Modal.Header>
                        <Modal.Title>运营用户管理</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12} xs={12} md={12}>
                                <HookFormEdit hv={true}/>
                            </Col>
                            <Col sm={12} xs={12} md={12}>
                                <HookCheckTree treeData={treeData}
                                               selectTreeData={selectTreeData}
                                               treeStyle={{maxHeight: 360}}
                                               style={{marginTop: 0}}/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button appearance="primary" loading={loading}>
                            保存
                        </Button>
                        <Button appearance="subtle" disabled={loading} onClick={this._onHide}>
                            取消
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }

}
