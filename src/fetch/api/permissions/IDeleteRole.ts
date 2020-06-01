import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqDeleteRole {
    id: string
}

export interface IResDeleteRole extends IUrlError {

}

/**
 * 编辑角色
 * @param model
 * @param callback
 * @constructor
 */
export function DeleteRole(model: IReqDeleteRole, callback: (e: IResDeleteRole) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions(`/role/delete/${model.id}.do`), {}))
}
