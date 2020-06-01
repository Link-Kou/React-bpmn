import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import RoleList from './component/roleList';
import RoleMenusTree from './component/roleMenusTree';
import RoleManage from './roleManage';
import {IReturnRoleMenus, IReturnTreeData} from './index.types';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';


/**
 *
 * @author lk
 * @date 2020/5/27 18:40
 * @version 1.0
 */
export default class Index extends RoleManage {

    public state = {
        display: false,
        loadering: true,
        id: '',
        roleList: []
    }

    componentDidMount() {
        this._onLoad()
    }

    private _onLoad = () => {
        this.handlersRoleList((res) => {
            this.setState({
                roleList: res,
                loadering: false
            })
        })
    }

    private _onEdit = (id: string, name: string, callbackCloseLoading: () => void) => {
        this.handlersRoleEdit({
            id,
            name
        }, () => {
            callbackCloseLoading?.()
        })
    }

    private _onPermit = (id?: string) => {
        const {display} = this.state
        this.setState({
            id,
            display: !display
        })
    }

    private _onDelete = (id: string, name: string) => {
        Dialog.Select({
            title: '是否删除提示',
            boby: IntlApi.IsDelBody(name),
            callback: (e) => {
                alert(JSON.stringify(e))
            }
        })
    }

    private _onDisable = (id: string, name: string, type: 'Disable' | 'Start') => {
        Dialog.Select({
            title: type === 'Disable' ? '是否禁用提示' : '是否启用提示',
            boby: IntlApi.IsDisableOrStartBody(name, type === 'Disable' ? '禁用' : '启用'),
            callback: (e) => {
                if (e) {
                    this.handlersRoleDisable(id, () => {
                        this._onLoad()
                    })
                }
            }
        })
    }

    /**
     * 添加角色
     * @param name
     * @param callbackCloseLoading
     * @private
     */
    private _onAddRole = (name: string, callbackCloseLoading: () => void) => {
        this.handlersRoleAdd(name, () => {
            this._onLoad()
            callbackCloseLoading?.()
        })
    }


    /**
     * 加载菜单
     * @param id
     * @param callback
     * @private
     */
    private _onLoadMenus = (id: string, callback: (node: Array<IReturnTreeData>, roleMenus: Array<IReturnRoleMenus>) => void) => {
        this.handlersRoleJionMenusTreesNodeList(id, (node, roleMenus) => {
            callback?.(node, roleMenus)
        })
    }

    /**
     * 保存权限
     * @param id
     * @param menusIds
     * @param callback
     * @private
     */
    private _onSaveJionMenus = (id: string, menusIds: Array<{ id: string, check: boolean }>, callback: () => void) => {
        this.handlersRoleJionMenus(id, menusIds, () => {
            this._onLoad()
            callback?.()
        })
    }

    public render() {
        const {display, roleList, id, loadering} = this.state
        const w = display ? 9 : 12
        return (
            <Grid fluid={true}>
                <Row>
                    {display ? <Col xs={2} sm={2} md={2}/> : <Col xs={6} sm={6} md={6}/>}
                    <Col xs={w} sm={w} md={w}>
                        <RoleList data={roleList}
                                  loadering={loadering}
                                  edit={display}
                                  onEdit={this._onEdit}
                                  onPermit={this._onPermit}
                                  onDelete={this._onDelete}
                                  onDisable={this._onDisable}
                                  onAdd={this._onAddRole}/>
                    </Col>
                    {
                        display ?
                            <Col xs={11} sm={11} md={11}><RoleMenusTree id={id}
                                                                        onSaveJion={this._onSaveJionMenus}
                                                                        onLoadMenus={this._onLoadMenus}
                                                                        onClose={this._onPermit}/></Col>
                            :
                            <Col xs={6} sm={6} md={6}/>
                    }
                </Row>
            </Grid>
        )
    }
}
