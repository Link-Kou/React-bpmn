import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IPaperProductTypes} from '@fetch/api/paper/index.types';

export interface IReqLoadPaperProduct {
    id?: string | number
}


export interface IResLoadPaperProduct extends IUrlError {
    data: IPaperProductTypes & {
        /**
         * 编号
         */
        id: string
    }
}

/**
 * 获取原纸产品
 * @param model
 * @param callback
 * @constructor
 */
export function LoadPaperProduct(model: IReqLoadPaperProduct, callback: (e: IResLoadPaperProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper(`/product/get/${model.id}.do`), model))
}
