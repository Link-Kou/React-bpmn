import * as React from 'react';
import {ApiPermissions} from '@fetch/api';
import {Alert} from 'rsuite';
import {IReturnRole, IReturnRoleMenus, IReturnTreeData} from './index.types';
import {IntlApi} from '@component/textIntl';

export default class RoleManage extends React.Component<any> {
    /**
     * 添加角色
     */
    protected handlersRoleAdd = async (name: string, callback: () => void) => {
        ApiPermissions.AddRole({
            name
        }, (res) => {
            if (res.success) {
                Alert.success('添加成功')
                callback?.();
            } else {
                Alert.warning(res.msg)
            }
        })
    }


    /**
     * 添加角色
     */
    protected handlersRoleEdit = async (props: { id: string, name: string }, callback: () => void) => {
        ApiPermissions.EditRole(props, (res) => {
            if (res.success) {
                Alert.success('修改成功')
                callback?.();
            } else {
                Alert.warning(res.msg)
            }
        })
    }


    /**
     * 禁用角色
     */
    protected handlersRoleDisable = async (id: string, callback: () => void) => {
        ApiPermissions.DisableRole({id}, (res) => {
            if (res.success) {
                Alert.success('禁用成功')
                callback?.();
            } else {
                Alert.warning(res.msg)
            }
        })
    }


    /**
     * 角色列表
     * @param callback
     */
    protected handlersRoleList = async (callback: (data: Array<IReturnRole>) => void) => {
        ApiPermissions.LoadRole((res) => {
            if (res.success) {
                callback?.(res.data);
            } else {
                callback?.([]);
            }
        })
    }

    /**
     * 获取角色关联的菜单与权限菜单树
     * @param id
     * @param callback
     */
    protected handlersRoleJionMenusTreesNodeList = async (id: string, callback: (node: Array<IReturnTreeData>, roleMenus: Array<IReturnRoleMenus>) => void) => {

        const fetch1 = new Promise((resolve, reject) => {
            ApiPermissions.LoadMenuTreeNodeList((res) => {
                if (res.success) {
                    resolve(res.data);
                } else {
                    reject(new Error())
                }
            })
        })

        const fetch2 = new Promise((resolve, reject) => {
            ApiPermissions.LoadRoleMenus({id}, (res) => {
                if (res.success) {
                    resolve(res.data);
                } else {
                    reject(new Error())
                }
            })
        })

        Promise.all([fetch1, fetch2])
            .then((result) => {
                callback?.(result[0] as Array<IReturnTreeData>, result[1] as Array<IReturnRoleMenus>)
            })
            .catch((error) => {
                Alert.warning(IntlApi.HttpError)
            })

    }

    /**
     * 关联权限
     * @param id
     * @param menusIds
     */
    protected handlersRoleJionMenus = async (id: string, menusIds: Array<{ id: string, check: boolean }>, callback: () => void) => {
        ApiPermissions.AddRoleJionMenus({
            roleId: id,
            menusIds
        }, (res) => {
            if (res.success) {
                Alert.success('权限关联成功')
                callback?.()
            } else {
                Alert.warning(res.msg)
            }
        })
    }
}
