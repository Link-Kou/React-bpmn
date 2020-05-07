import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {ICorrugatedProductTypes} from '@fetch/api/corrugated/index.types';

export interface IReqLoadCorrugatedProduct {
    id: string
}

export interface IResLoadCorrugatedProduct extends IUrlError {
    data: ICorrugatedProductTypes
}

/**
 * 获取要编辑的瓦楞产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCorrugatedProduct(model: IReqLoadCorrugatedProduct, callback: (e: IResLoadCorrugatedProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/product/edit/get.do'), model))
}
