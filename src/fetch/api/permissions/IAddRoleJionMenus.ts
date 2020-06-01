import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqAddRoleJionMenus {
    roleId: string
    menusIds: Array<{ id: string, check: boolean }>
}

export interface IResAddRoleJionMenus extends IUrlError {

}

/**
 * 角色关联菜单
 * @param model
 * @param callback
 * @constructor
 */
export function AddRoleJionMenus(model: IReqAddRoleJionMenus, callback: (e: IResAddRoleJionMenus) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/role/jion.do'), model))
}
