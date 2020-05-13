import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAddEditMaterialProduct} from './index.types';

export interface IReqAddMaterialProduct extends IAddEditMaterialProduct {

}

export interface IResAddMaterialProduct extends IUrlError {

}

/**
 * 添加辅料
 * @param model
 * @param callback
 * @constructor
 */
export function AddMaterialProduct(model: IReqAddMaterialProduct, callback: (e: IResAddMaterialProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getMaterial('/product/add.do'), model))
}
