import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAddCardboardProduct} from './index.types';

export interface IReqAddCardboardProduct extends IAddCardboardProduct {

}

export interface IResAddCardboardProduct extends IUrlError {

}

/**
 * 添加纸板
 * @param model
 * @param callback
 * @constructor
 */
export function AddCardboardProduct(model: IReqAddCardboardProduct, callback: (e: IResAddCardboardProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCardboard('/product/add.do'), model))
}
