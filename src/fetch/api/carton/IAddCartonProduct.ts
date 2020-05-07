import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAddCartonProduct} from './index.types';

export interface IReqAddCartonProduct extends IAddCartonProduct {

}

export interface IResAddCartonProduct extends IUrlError {

}


/**
 * 添加纸箱
 * @param model
 * @param callback
 * @constructor
 */
export function AddCartonProduct(model: IReqAddCartonProduct, callback: (e: IResAddCartonProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCarton('/product/add.do'), model))
}
