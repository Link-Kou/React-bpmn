import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IPaperProductTypes} from '@fetch/api/paper/index.types';

export interface IReqLoadPagesPaperProductList extends IPageResData {

}

export interface IResLoadPagesPaperProductList extends IPageReqData {
    data: {
        total: number
        list: Array<IPaperProductTypes>
    }
}

/**
 * 分页获取获取原纸产品列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadPagesPaperProductList(model: IReqLoadPagesPaperProductList, callback: (e: IResLoadPagesPaperProductList) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/product/list/pages.do'), model))
}
