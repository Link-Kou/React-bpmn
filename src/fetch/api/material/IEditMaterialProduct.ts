import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';
import {IAddEditMaterialProduct} from './index.types';

export interface IReqEditMaterialProduct extends IAddEditMaterialProduct {
    id: string
}

export interface IResEditMaterialProduct extends IUrlError {

}

/**
 * 添加辅料
 * @param model
 * @param callback
 * @constructor
 */
export function EditMaterialProduct(model: IReqEditMaterialProduct, callback: (e: IResEditMaterialProduct) => void) {
    PromiseFetch(callback, Fetch(Url.getMaterial('/product/edit.do'), model))
}
