import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {ICorrugatedProductTypes} from './index.types';

export interface IReqEditCorrugatedProduct extends ICorrugatedProductTypes {
    id: string
}

export interface IResEditCorrugatedProduct extends IUrlError {

}

/**
 * 编辑瓦楞产品
 * @param model
 * @param callback
 * @constructor
 */
export function EditCorrugatedProduct(model: IReqEditCorrugatedProduct, callback: (e: IResEditCorrugatedProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getCorrugated('/product/edit/update.do'), model))
}
