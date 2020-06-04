import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAdmin} from './index.types';

export interface IReqAddAdmin extends IAdmin{

}

export interface IResAddAdmin extends IUrlError {

}

/**
 * 添加用户
 * @param model
 * @param callback
 * @constructor
 */
export function AddAdmin(model: IReqAddAdmin, callback: (e: IResAddAdmin) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/admin/add.do'), model))
}
