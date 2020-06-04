import * as React from 'react';
import {Dropdown, Icon, IconButton, Nav, Panel} from 'rsuite';
import {HeadPanel, LoadPanel} from '@component/panel';
import HookFormEdit from './compone/hookFormEdit';
import HookCheckTree from './compone/hookCheckTree';
import {IAdmin, IReturnRole, IReturnRoleMenus, IReturnTreeData} from '../../index.types';
import {utilsTree} from '@utils/index';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';


interface IProps {

    data?: IAdmin

    onLoad?(rolesId?: Array<string>, callback?: (node: Array<IReturnTreeData>, roleMenus: Array<Array<IReturnRoleMenus>>, role: Array<IReturnRole>) => void): void

    onEdit?(formValue: IAdmin, callback: () => void): void

    onSave?(id: string, value: IAdmin, callback: () => void): void
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
        loadering: true,
        loading: true,
        edit: false
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {data} = this.props
        const {data: preData} = prevProps
        if (preData?.roles !== data?.roles) {
            this.onLoad()
        }
    }

    public onLoad() {
        const {data} = this.props
        const {edit} = this.state
        if (!edit) {
            this.setState({
                loading: false,
                loadering: true
            }, () => {
                this._onLoad(data?.roles)
            })
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
                loadering: false
            })
        });
    }

    /**
     * 表单改变
     * @param formValue
     * @private
     */
    private _onChangeHookFormEdit = (formValue: any) => {
        const {onEdit} = this.props
        onEdit?.(formValue, () => {
            this._onLoad(formValue?.roles)
        })

    }

    private _onSelect = (eventKey: any) => {
        const {edit} = this.state
        switch (eventKey) {
            case 'editInformation':
                this.setState({
                    edit: !edit
                })
                break;
            default:
                break;
        }
    }

    /**
     * 保存数据
     * @private
     */
    private _onSave = () => {
        const {data, onSave} = this.props
        if (data) {
            Dialog.SelectLoad({
                title: IntlApi.TitleSave,
                boby: IntlApi.IsInfo('用户名', data.name, '的信息进行保存'),
                callback: (e) => {
                    if (e.success) {
                        onSave?.(data.id, data, () => {
                            e.close(() => {
                                this.setState({
                                    edit: false
                                }, () => {
                                    this.onLoad()
                                })
                            })
                        })
                    }
                }
            })
        }
    }


    public render() {
        const {data} = this.props
        const {treeData, selectTreeData, roles, loadering, loading, edit} = this.state
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'管理面板'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        {
                            edit ? <IconButton appearance={'subtle'}
                                               disabled={loadering}
                                               onClick={this._onSave}
                                               icon={<Icon icon={'save'}/>}>保存</IconButton> : undefined
                        }
                        <Dropdown title={'管理'} disabled={loadering} trigger="click" onSelect={this._onSelect}>
                            <Dropdown.Item eventKey={'editInformation'}>{
                                edit ? '取消编辑' : '编辑信息'
                            }</Dropdown.Item>
                            <Dropdown.Item eventKey={'resetPassword'}>重置密码</Dropdown.Item>
                            <Dropdown.Item eventKey={'deleteUsers'}>删除用户</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <LoadPanel subHeight={170}
                           loadering={loadering}
                           onLoader={((l, v) => {
                               if (loading) {
                                   return {
                                       title: '暂无数据....',
                                       hide: true,
                                       hideLoaderIcons: true
                                   }
                               }
                               return {
                                   ...v,
                                   hideLoaderIcons: false
                               }
                           })}
                           outrender={false}
                           queueAnim={false}>
                    <Panel bodyFill={false}>
                        <HookFormEdit edit={!edit}
                                      formValue={data}
                                      roles={roles}
                                      onChange={this._onChangeHookFormEdit}/>
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
