import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IRole} from './index.types';


export interface IResLoadRole extends IUrlError {
    data: Array<IRole>
}

/**
 * 角色列表
 * @param callback
 * @constructor
 */
export function LoadRole(callback: (e: IResLoadRole) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions(`/role/list.do`), {}))
}
