import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IPaperProductTypes} from '@fetch/api/paper/index.types';

export interface IReqAddPaperProduct extends IPaperProductTypes{

}

export interface IResAddPaperProduct extends IUrlError {

}

/**
 * 添加原纸产品
 * @param model
 * @param callback
 * @constructor
 */
export function AddPaperProduct(model: IReqAddPaperProduct, callback: (e: IResAddPaperProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/product/add.do'), model))
}
