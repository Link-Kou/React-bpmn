import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnCartonProduct} from './index.types';

export interface IReqLoadCartonProduct {
    cartonId: string
}

export interface IResLoadCartonProduct extends IUrlError {
    data: IReturnCartonProduct
}

/**
 * 纸箱产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadCartonProduct(model: IReqLoadCartonProduct, callback: (e: IResLoadCartonProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCarton(`/product/get/${model.cartonId}.do`), model))
}
