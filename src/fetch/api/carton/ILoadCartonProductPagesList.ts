import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnCartonProduct} from '@fetch/api/carton/index.types';

export interface IReqLoadCartonProductListPage extends IPageResData {

}

export interface IResLoadCartonProductListPage extends IPageReqData {
    data: {
        total: number
        list: Array<IReturnCartonProduct>
    }
}

/**
 * 纸箱列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCartonProductPage(model: IReqLoadCartonProductListPage, callback: (e: IResLoadCartonProductListPage) => void) {
    PromiseFetch(callback, Fetch(Url.getCarton('/product/list/pages.do'), model))
}
