import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {ICorrugatedProductTypes} from './index.types';

export interface IReqLoadCorrugatedProductListPage extends IPageResData {
}

export interface IResLoadCorrugatedProductListPage extends IPageReqData {
    data: {
        total: number
        list: Array<ICorrugatedProductTypes>
    }
}

/**
 * 获取要编辑的瓦楞产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCorrugatedProductPage(model: IReqLoadCorrugatedProductListPage, callback: (e: IResLoadCorrugatedProductListPage) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/product/list/pages.do'), model))
}
