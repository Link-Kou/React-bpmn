import {IRole, IRoleMenus, IAdmin as Admin} from '@fetch/api/permissions/index.types';
import {IReturnTreeData as TreeData} from '../../systemSettings/menusTree/index.types';

export interface IReturnRole extends IRole {

}


export interface IReturnRoleMenus extends IRoleMenus {

}


export interface IReturnTreeData extends TreeData {

}

export const IStateAdmin: IAdmin = {
    id: '',
    /**
     * 名称
     */
    name: '',
    /**
     * 手机
     */
    phone: '',
    /**
     * 邮箱
     */
    email: '',
    /**
     * 备注
     */
    remarks: [],
    /**
     * 角色
     */
    roles: []
}

export interface IAdmin extends Admin {

}
