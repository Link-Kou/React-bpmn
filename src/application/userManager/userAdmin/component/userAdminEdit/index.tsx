import * as React from 'react';
import {Dropdown, Nav, Panel} from 'rsuite';
import {HeadPanel, LoadPanel} from '@component/panel';
import HookFormEdit from './compone/hookFormEdit';
import HookCheckTree from './compone/hookCheckTree';
import {IAdmin, IReturnRole, IReturnRoleMenus, IReturnTreeData} from '../../index.types';
import {utilsTree} from '@utils/index';


interface IProps {

    data?: IAdmin

    onLoad?(rolesId?: Array<string>, callback?: (node: Array<IReturnTreeData>, roleMenus: Array<Array<IReturnRoleMenus>>, role: Array<IReturnRole>) => void): void
}


/**
 *
 * @author lk
 * @date 2020/5/26 16:37
 * @version 1.0
 */
export default class UserAdminEdit extends React.Component<IProps> {

    public state = {
        treeData: [],
        selectTreeData: [],
        roles: [],
        loadering: true
    }

    componentDidMount() {

    }

    public onLoad() {
        const {data} = this.props
        this._onLoad(data?.roles)
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
                loadering: false
            })
        });
    }


    public render() {
        const {data} = this.props
        const {treeData, selectTreeData, roles, loadering} = this.state
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'管理面板'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'管理'} trigger="click" onSelect={(e) => {

                        }}>
                            <Dropdown.Item>修改信息</Dropdown.Item>
                            <Dropdown.Item>重置密码</Dropdown.Item>
                            <Dropdown.Item>删除用户</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <LoadPanel subHeight={170}
                           loadering={loadering}
                           onLoader={((l, v) => {
                               return {
                                   title: '暂无数据....',
                                   hide: l,
                                   hideLoaderIcons: true
                               }
                           })}
                           outrender={false}
                           queueAnim={false}>
                    <Panel bodyFill={false}>
                        <HookFormEdit formValue={data} roles={roles}/>
                        <HookCheckTree treeData={treeData} selectTreeData={selectTreeData}/>
                    </Panel>
                </LoadPanel>
                <Nav justified={true} vertical={false} appearance={'tabs'} activeKey={'home'}
                     reversed={true}>
                    <Nav.Item eventKey="home">权限信息</Nav.Item>
                    <Nav.Item eventKey="news">操作记录</Nav.Item>
                </Nav>
            </>
        )
    }

}
