import * as React from 'react';
import {ApiPermissions} from '@fetch/api';
import {Alert} from 'rsuite';
import {IntlApi} from '@component/textIntl';
import {IReturnTreeData, IReturnRoleMenus} from './index.types';


export default class UserAdmin extends React.Component<any> {


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
}
