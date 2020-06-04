import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAdmin} from './index.types';

export interface IReqLoadAdminPages extends IPageResData {

}

export interface IResLoadAdminPages extends IPageReqData {
    data: {
        /**
         * 总页数
         */
        total: number
        /**
         * 数据
         */
        list: Array<IAdmin>
    }
}

/**
 * 角色列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadAdminPages(model: IReqLoadAdminPages, callback: (e: IResLoadAdminPages) => void) {
    PromiseFetch(callback, Fetch(Url.getPermissions('/admin/list/pages.do'), model))
}
