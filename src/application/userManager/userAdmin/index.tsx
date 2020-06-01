import {Col, Grid, Row} from 'rsuite';
import * as React from 'react';
import {BackColorPanel} from '@component/panel';
import UserAdminTable from './component/userAdminTable';
import UserAdminEditPanel from './component/userAdminEdit/panel';
import UserAdmin from './userAdmin';
import {utilsTree} from '@utils/index';

/**
 * 运营用户管理
 * @author lk
 * @date 2020/5/26 16:20
 * @version 1.0
 */
export default class Index extends UserAdmin {

    public state = {
        treeData: [],
        selectTreeData: []
    }

    componentDidMount() {
        this._loadMenus()
    }

    private _loadMenus = () => {
        this.handlersRoleJionMenusTreesNodeList('', (node, roleMenus) => {
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
            const selectTreeData: any = roleMenus.filter((k, i, a) => k.check === 1)
                .map((k, i, a) => k.menusId);

            iNodes.then((result) => {
                const iNodes1 = result.filter((k, i, a) => k.parentId === '');
                this.setState({
                    treeData: iNodes1 as any,
                    selectTreeData
                })
            })
        })
    }


    public render() {
        const {treeData, selectTreeData} = this.state
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col sm={15} xs={15} md={15}>
                            <BackColorPanel tableBordered={true}>
                                <UserAdminTable
                                    treeData={treeData}
                                    selectTreeData={selectTreeData}
                                />
                            </BackColorPanel>
                        </Col>
                        <Col sm={9} xs={9} md={9} smHidden={true}>
                            <BackColorPanel>
                                <UserAdminEditPanel treeData={treeData}
                                                    selectTreeData={selectTreeData}/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
