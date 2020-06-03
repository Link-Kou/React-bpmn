import * as React from 'react';
import {ApiPermissions} from '@fetch/api';
import {Alert} from 'rsuite';
import {IntlApi} from '@component/textIntl';
import {IReturnTreeData, IReturnRoleMenus, IReturnRole, IAdmin} from './index.types';


export default class UserAdmin extends React.Component<any> {


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
            ApiPermissions.LoadRolesMenus([id], (res) => {
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
     * 获取角色关联的菜单与权限菜单树
     * @param id
     * @param callback
     */
    protected handlersRoleJionMenusOrRoleList = (id?: Array<string>, callback?: (node: Array<IReturnTreeData>, roleMenus: Array<Array<IReturnRoleMenus>>, role: Array<IReturnRole>) => void) => {

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
            ApiPermissions.LoadRolesMenus(id, (res) => {
                if (res.success) {
                    resolve(res.data);
                } else {
                    resolve([])
                }
            })
        })

        const fetch3 = new Promise((resolve, reject) => {
            ApiPermissions.LoadRole((res) => {
                if (res.success) {
                    resolve?.(res.data);
                } else {
                    reject(new Error())
                }
            })
        })


        Promise.all([fetch1, fetch2, fetch3])
            .then((result) => {
                callback?.(
                    result[0] as Array<IReturnTreeData>,
                    result[1] as Array<Array<IReturnRoleMenus>>,
                    result[2] as Array<IReturnRole>
                )
            })
            .catch((error) => {
                Alert.warning(IntlApi.HttpError)
            })

    }

    /**
     * 添加管理员
     * @param admin
     * @param callback
     */
    protected handlersAddAdmin = (admin: IAdmin, callback: () => void) => {
        ApiPermissions.AddAdmin(admin, (res) => {
            if (res.success) {
                Alert.success('添加成功')
                callback?.();
            } else {
                Alert.warning(res.msg)
            }
        })
    }

    /**
     * 分页加载
     * @param pages
     * @param callback
     */
    protected handlersLoadAdminPages = (pages: any, callback: (total: number, list: Array<IAdmin>) => void) => {
        ApiPermissions.LoadAdminPages({
            page: 1,
            itemsPerPage: 10
        }, (res) => {
            if (res.success) {
                Alert.success('加载成功')
                callback?.(res.data.total, res.data.list)
            } else {
                Alert.warning(res.msg)
            }
        });
    }

}
