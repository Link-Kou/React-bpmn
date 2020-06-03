import {Col, Grid, Row} from 'rsuite';
import * as React from 'react';
import {BackColorPanel} from '@component/panel';
import UserAdminTable from './component/userAdminTable';
import UserAdminEditPanel from './component/userAdminEdit';
import UserAdmin from './userAdmin';
import UserAdminAdd from './component/userAdminAdd';
import {IAdmin, IReturnRole, IReturnRoleMenus, IReturnTreeData} from './index.types';

/**
 * 运营用户管理
 * @author lk
 * @date 2020/5/26 16:20
 * @version 1.0
 */
export default class Index extends UserAdmin {

    private _UserAdminEditPanel: UserAdminEditPanel | undefined

    public state = {
        rowData: {},
        toolSelectKey: ''
    }

    componentDidMount() {

    }

    /**
     * 加载管理员列表
     * @private
     */
    private _loadAdminList = (pages?: { page: number, itemsPerPage: number }, callback?: (total: number, list: Array<IAdmin>) => void) => {
        this.handlersLoadAdminPages(pages, (total, list) => {
            callback?.(total, list)
        })
    }

    /**
     * 工具栏选择
     * @param toolSelectKey
     * @private
     */
    private _onToolSelect = (toolSelectKey?: any) => {
        this.setState({
            toolSelectKey
        })
    }

    /**
     * 加载树
     * @param rolesId
     * @param callback
     * @private
     */
    private _onLoadTree = (rolesId?: Array<string>, callback?: (node: Array<IReturnTreeData>, roleMenus: Array<Array<IReturnRoleMenus>>, role: Array<IReturnRole>) => void) => {
        this.handlersRoleJionMenusOrRoleList(rolesId, callback)
    }

    private _onSave = (value: IAdmin, callback: () => void) => {
        this.handlersAddAdmin(value, callback)
    }

    /**
     * 加载行
     * @param rowData
     * @private
     */
    private _onRowClick = (rowData: IAdmin) => {
        this.setState({
            rowData
        }, () => this._UserAdminEditPanel?.onLoad())
    }

    public render() {
        const {rowData, toolSelectKey} = this.state
        return (
            <>
                <UserAdminAdd
                    show={toolSelectKey === 'addUser'}
                    onSave={this._onSave}
                    onClose={this._onToolSelect}
                    onLoad={this._onLoadTree}
                />
                <Grid fluid={true}>
                    <Row>
                        <Col sm={15} xs={15} md={15}>
                            <BackColorPanel tableBordered={true}>
                                <UserAdminTable
                                    onRowClick={this._onRowClick}
                                    onLoad={this._loadAdminList}
                                    onToolSelect={this._onToolSelect}
                                />
                            </BackColorPanel>
                        </Col>
                        <Col sm={9} xs={9} md={9} smHidden={true}>
                            <BackColorPanel>
                                <UserAdminEditPanel
                                    ref={(ref: any) => this._UserAdminEditPanel = ref}
                                    data={rowData as any}
                                    onLoad={this._onLoadTree}/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
