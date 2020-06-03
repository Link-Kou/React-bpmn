import * as React from 'react';
import {CheckTree, Icon, IconButton, Panel} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';
import {IReturnRoleMenus, IReturnTreeData} from '../../index.types';
import {utilsTree} from '@utils/index';


interface IProps {

    id?: string

    onClose?(): void

    onLoadMenus?(id: string, callback: (node: Array<IReturnTreeData>, roleMenus: Array<IReturnRoleMenus>) => void): void

    onSaveJion?(id: string, menusIds: Array<{ id: string, check: boolean }>, callback: () => void): void

}

/**
 *
 * @author lk
 * @date 2020/5/27 18:40
 * @version 1.0
 */
export default class RoleMenusTree extends React.Component<IProps> {

    public state = {
        treeData: [],
        /**
         * 选中的数据
         */
        selectTreeData: [],
        /**
         * 已关联的数据
         */
        joinTreeData: [],
        /**
         * 选择的Node
         */
        selectNode: new Map(),
        loadering: true
    }


    componentDidMount() {
        this._loadMenus()
    }


    private _loadMenus = () => {
        const {onLoadMenus, id} = this.props
        if (id) {
            onLoadMenus?.(id, (node, roleMenus) => {
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
                const selectTreeData = roleMenus.filter((k, i, a) => k.check === 1)
                    .map((k, i, a) => k.menusId);

                const iNodes1 = iNodes.filter((k, i, a) => k.parentId === '');
                this.setState({
                    treeData: iNodes1 as any,
                    selectTreeData,
                    joinTreeData: roleMenus,
                    loadering: false
                })
            })
        }
    }

    private _onSelect = (activeNode: any, value: Array<any>, event: any) => {
        const {selectNode} = this.state
        const {value: valueItem, check}: { children: Array<any>, parentNode: Array<any>, value: string, check: boolean } = activeNode
        if (check) {
            selectNode.set(valueItem, activeNode)
        } else {
            selectNode.delete(valueItem)
        }
        this.setState({
            selectTreeData: value
        })
    }

    private _onSaveJion = () => {
        const {selectNode, selectTreeData, joinTreeData} = this.state
        const {onSaveJion, id} = this.props
        const map = new Set();
        joinTreeData.forEach((k: any, i, a) => {
            map.add(k.menusId)
        })
        selectNode.forEach((v, k, a) => {
            const {children, parentNode, value}: { children: Array<any>, parentNode: Array<any>, value: string } = v
            map.add(value);
            const childrens = (childrenItem: any) => {
                if (Array.isArray(childrenItem)) {
                    children.forEach((ck, ci, ca) => {
                        map.add(ck.value);
                        childrens(ck.children)
                    })
                }
            }
            childrens(children);
            const parentNodes = (parentNodeItem: any) => {
                if (parentNodeItem) {
                    map.add(parentNodeItem.value);
                    parentNodes(parentNodeItem.parentNode)
                }
            }
            parentNodes(parentNode);
        })
        if (id) {
            const jionTreeDataItem: Array<{
                id: string,
                check: boolean
            }> = []
            map.forEach((v, k, a) => {
                //选择的菜单
                const number = selectTreeData.findIndex((fk, fi, fa) => {
                    return fk === v
                });
                jionTreeDataItem.push({
                    id: v as string,
                    check: number > -1
                })
            })
            onSaveJion?.(id, jionTreeDataItem, () => {
                this._loadMenus()
            });
        }
    }


    public render() {
        const {onClose} = this.props
        const {treeData, loadering, selectTreeData} = this.state
        return (
            <BackColorPanel>
                <HeadPanel hideBorderBottom={true} title={'权限管理'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <IconButton appearance={'subtle'}
                                    onClick={this._onSaveJion}
                                    icon={<Icon icon={'link'}/>}>关联权限</IconButton>
                        <IconButton appearance={'subtle'}
                                    onClick={onClose}
                                    icon={<Icon icon={'close-circle'}/>}>取消</IconButton>
                    </div>
                </HeadPanel>
                <LoadPanel loadering={loadering} outrender={false} queueAnim={true}>
                    <Panel>
                        <CheckTree
                            cascade={true}
                            style={{maxHeight: 'none'}}
                            data={treeData}
                            value={selectTreeData}
                            draggable={true}
                            defaultExpandAll={true}
                            onSelect={this._onSelect}
                        />
                    </Panel>
                </LoadPanel>
            </BackColorPanel>
        )
    }
}
