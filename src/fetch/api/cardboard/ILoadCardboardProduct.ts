import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnCardboardProduct} from './index.types';

export interface IReqLoadCardboardProduct {
    cardboardId: string
}

export interface IResLoadCardboardProduct extends IUrlError {
    data: IReturnCardboardProduct
}

/**
 * 纸板产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCardboardProduct(model: IReqLoadCardboardProduct, callback: (e: IResLoadCardboardProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCardboard(`/product/get/${model.cardboardId}.do`), model))
}
