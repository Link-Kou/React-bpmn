import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAddCartonProduct} from './index.types';

export interface IReqEditCartonProduct extends IAddCartonProduct {

}

export interface IResEditCartonProduct extends IUrlError {

}


/**
 * 编辑纸箱
 * @param model
 * @param callback
 * @constructor
 */
export function EditCartonProduct(model: IReqEditCartonProduct, callback: (e: IResEditCartonProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCarton('/product/edit.do'), model))
}
