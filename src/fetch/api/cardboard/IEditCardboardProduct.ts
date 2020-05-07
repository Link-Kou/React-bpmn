import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAddCardboardProduct} from './index.types';

export interface IReqEditCardboardProduct extends IAddCardboardProduct {

}

export interface IResEditCardboardProduct extends IUrlError {

}

/**
 * 编辑纸板
 * @param model
 * @param callback
 * @constructor
 */
export function EditCardboardProduct(model: IReqEditCardboardProduct, callback: (e: IResEditCardboardProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCardboard('/product/edit.do'), model))
}
