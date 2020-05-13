import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IReturnMaterialProduct} from './index.types';

export interface IReqLoadMaterialProduct {
    materialId: string
}

export interface IResLoadMaterialProduct extends IUrlError {
    data: IReturnMaterialProduct
}

/**
 * 获取辅料
 * @param model
 * @param callback
 * @constructor
 */
export function LoadMaterialProduct(model: IReqLoadMaterialProduct, callback: (e: IResLoadMaterialProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getMaterial(`/product/get/${model.materialId}.do`), model))
}
