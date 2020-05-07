import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnCardboardProduct} from './index.types';

export interface IReqLoadCardboardProductListPage extends IPageResData {
}

export interface IResLoadCardboardProductListPage extends IPageReqData {
    data: {
        total: number
        list: Array<IReturnCardboardProduct>
    }
}

/**
 * 纸板列表
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCardboardProductPage(model: IReqLoadCardboardProductListPage, callback: (e: IResLoadCardboardProductListPage) => void) {
    PromiseFetch(callback, Fetch(Url.getCardboard('/product/list/pages.do'), model))
}
