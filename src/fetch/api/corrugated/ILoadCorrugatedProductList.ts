import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {ICorrugatedProductTypes} from './index.types';


export interface IResLoadCorrugatedProductList extends IUrlError {
    data: Array<ICorrugatedProductTypes>
}

/**
 * 获取要编辑的瓦楞产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCorrugatedProductList(callback: (e: IResLoadCorrugatedProductList) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/product/list/all.do'), {}))
}
