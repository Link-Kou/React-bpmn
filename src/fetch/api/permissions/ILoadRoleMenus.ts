import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IRoleMenus} from './index.types';


export interface IReqLoadRoleMenusTreeNode {
    id: string
}


export interface IResLoadRoleMenus extends IUrlError {
    data: Array<IRoleMenus>
}

/**
 * 角色列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadRoleMenus(model: IReqLoadRoleMenusTreeNode, callback: (e: IResLoadRoleMenus) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions(`/role/menus/${model.id}.do`), {}))
}
