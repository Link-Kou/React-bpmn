import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAdmin} from './index.types';

export interface IReqEditAdmin extends IAdmin {

}

export interface IResEditAdmin extends IUrlError {

}

/**
 * 编辑用户
 * @param model
 * @param callback
 * @constructor
 */
export function EditAdmin(model: IReqEditAdmin, callback: (e: IResEditAdmin) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/admin/edit.do'), model))
}
