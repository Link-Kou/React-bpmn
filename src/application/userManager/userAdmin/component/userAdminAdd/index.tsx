import * as React from 'react';
import {Button, Col, Modal, Row, Grid} from 'rsuite';
import HookFormEdit from './compone/hookFormEdit';
import HookCheckTree from './compone/hookCheckTree';
import {IAdmin, IReturnRole, IReturnRoleMenus, IReturnTreeData, IStateAdmin} from '../../index.types';
import {utilsTree} from '@utils/index';
import {LoadPanel} from '@component/panel';

interface IProps {
    onClose?(): void

    show?: boolean

    onLoad?(rolesId?: Array<string>, callback?: (node: Array<IReturnTreeData>, roleMenus: Array<Array<IReturnRoleMenus>>, role: Array<IReturnRole>) => void): void

    onSave?(id: string, value: IAdmin, callback: () => void): void
}

/**
 *
 * @author lk
 * @date 2020/6/2 08:23
 * @version 1.0
 */
export default class UserAdminAdd extends React.Component<IProps> {
    public state = {
        loading: true,
        buttonloading: true,
        formValue: IStateAdmin,
        treeData: [],
        selectTreeData: [],
        roles: []
    }

    private _onShow = () => {
        this.setState({
            loading: true,
            buttonloading: true,
            formValue: {
                name: ''
            },
            formError: {}
        }, () => this._onLoad())
    }

    private _onHide = () => {
        const {loading} = this.state;
        const {onClose} = this.props;
        if (!loading) {
            onClose?.()
        }
    }

    /**
     * 加载
     * @param rolesId 角色id
     * @private
     */
    private _onLoad = (rolesId?: Array<string>) => {
        const {onLoad} = this.props;
        onLoad?.(rolesId, (node: Array<IReturnTreeData>, roleMenus: Array<Array<IReturnRoleMenus>>, role: Array<IReturnRole>) => {
            const treeData = node.map((k, i, a) => {
                return ({
                    label: k.title,
                    value: k.id,
                    type: k.type,
                    keyId: k.keyId,
                    parentId: k.parentId,
                    preId: k.preId
                })
            });
            const iNodes = utilsTree.buildListToTreeSort({
                treeData,
                getNodeKey: (inode) => inode.value,
                getParentKey: (inode) => inode.parentId,
                getPrevId: 'preId'
            });
            const selectTreeData: any = roleMenus.map((k, i, a) => {
                return k.filter((fk, fi, fa) => fk.check === 1)
                    .map((mk, mi, ma) => mk.menusId)
            }).reduce((r, item) => r.concat(item), []);
            const iNodes1 = iNodes.filter((k, i, a) => k.parentId === '');
            const map = role.map((k, i, a) => ({
                value: k.id,
                label: k.title
            }));
            this.setState({
                treeData: iNodes1 as any,
                selectTreeData,
                roles: map,
                loading: false,
                buttonloading: false
            })
        });
    }

    /**
     * 表单改变
     * @param formValue
     * @private
     */
    private _onChangeHookFormEdit = (formValue: any) => {
        if (formValue.roles) {
            this._onLoad(formValue.roles)
        }
        this.setState({
            formValue
        })
    }

    private _onSave = () => {
        const {onSave} = this.props
        const {formValue} = this.state
        this.setState({
            buttonloading: true
        }, () => {
            onSave?.('', formValue, () => {
                this._onHide()
            });
        })
    }

    public render() {
        const {loading, treeData, selectTreeData, roles, buttonloading} = this.state
        const {show} = this.props
        return (
            <>
                <Modal show={show}
                       size={'sm'}
                       backdrop={'static'}
                       onShow={this._onShow}
                       onHide={this._onHide}>
                    <Modal.Header>
                        <Modal.Title>运营用户管理</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoadPanel height={450} loadering={loading} outrender={true}>
                            <Grid fluid={true}>
                                <Row>
                                    <Col sm={12} xs={12} md={12}>
                                        <HookFormEdit roles={roles} onChange={this._onChangeHookFormEdit}/>
                                    </Col>
                                    <Col sm={12} xs={12} md={12}>
                                        <HookCheckTree treeData={treeData}
                                                       selectTreeData={selectTreeData}
                                                       treeStyle={{maxHeight: 360}}
                                                       style={{marginTop: 0}}/>
                                    </Col>
                                </Row>
                            </Grid>
                        </LoadPanel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button appearance="primary" loading={buttonloading} onClick={this._onSave}>
                            保存
                        </Button>
                        <Button appearance="subtle" onClick={this._onHide}>
                            取消
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }
}

