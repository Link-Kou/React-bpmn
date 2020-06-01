import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqDisableRole {
    id: string
}

export interface IResDisableRole extends IUrlError {

}

/**
 * 禁用角色
 * @param model
 * @param callback
 * @constructor
 */
export function DisableRole(model: IReqDisableRole, callback: (e: IResDisableRole) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions(`/role/disable/${model.id}.do`), {}))
}
