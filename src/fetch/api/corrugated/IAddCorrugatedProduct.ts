import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {ICorrugatedProductTypes} from './index.types';

export interface IReqAddCorrugatedProduct extends ICorrugatedProductTypes {

}

export interface IResAddCorrugatedProduct extends IUrlError {

}

/**
 * 添加瓦楞产品
 * @param model
 * @param callback
 * @constructor
 */
export function AddCorrugatedProduct(model: IReqAddCorrugatedProduct, callback: (e: IResAddCorrugatedProduct) => void) {
    const url = {
        1: '/product/add/in.do',
        2: '/product/add/out.do'
    }
    if (model.makeMode) {
        PromiseFetch(callback, Fetch(Url.getCorrugated(url[model.makeMode]), model))
    }
}
