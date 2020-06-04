import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IRoleMenus} from './index.types';


export interface IReqLoadRolesMenus {
    id: string
}


export interface IResLoadRolesMenus extends IUrlError {
    data: Array<Array<IRoleMenus>>
}

/**
 * 批量获取角色关联菜单
 * @param model
 * @param callback
 * @constructor
 */
export function LoadRolesMenus(model?: Array<string>, callback?: (e: IResLoadRolesMenus) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/role/roles/menu.do'), model))
}
