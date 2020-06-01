import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqEditRole {
    id: string
    name: string
}

export interface IResEditRole extends IUrlError {

}

/**
 * 编辑角色
 * @param model
 * @param callback
 * @constructor
 */
export function EditRole(model: IReqEditRole, callback: (e: IResEditRole) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/role/edit.do'), model))
}
